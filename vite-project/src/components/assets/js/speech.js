navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

// variables

var record = document.querySelector('.record');
var stop = document.querySelector('.stop');
var upload = document.querySelector('.upload');
var soundClips = document.querySelector('.sound-clips');
var canvas = document.querySelector('.visualizer');
var mediaRecorder = null;
var mediaStreamSource = null;
var ignoreAutoPlay = false;

// disable stop button while not recording

stop.disabled = true;
upload.disabled = true;

// visualiser setup - create web audio api context and canvas

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var canvasCtx = canvas.getContext("2d");
var analyser = audioCtx.createAnalyser();
var dataArray = new Uint8Array(analyser.frequencyBinCount);

// audio recording

if (navigator.getUserMedia) {
    console.log('getUserMedia supported.');

    var constraints = { audio: true };
    var chunks = [];

    var onSuccess = function (stream) {
        mediaRecorder = new MediaRecorder(stream);
        mediaStreamSource = audioCtx.createMediaStreamSource(stream);
        mediaStreamSource.connect(analyser);
        visualize();

        record.onclick = function () {
            // countdown
            var progress = document.querySelector('.progress-display');
            progress.innerText = "3";
            document.querySelector('.info-display').innerText = "";
            setTimeout(function () {
                progress.innerText = "2";
                setTimeout(function () {
                    progress.innerText = "1";
                    setTimeout(function () {
                        progress.innerText = "";
                        startRecording();
                    }, 1000);
                }, 1000);
            }, 1000);

            stop.disabled = false;
            record.disabled = true;
        }

        stop.onclick = function () {
            if (mediaRecorder.state == 'inactive') {
                // The user has already pressed stop, so don't set up another word.
                ignoreAutoPlay = true;
            } else {
                mediaRecorder.stop();
            }
            mediaStreamSource.disconnect();
            console.log(mediaRecorder.state);
            record.style.background = "";
            record.style.color = "";
            stop.disabled = true;
            record.disabled = false;
        }

        upload.onclick = function () {
            saveRecordings();
        }

        mediaRecorder.onstop = function (e) {
            console.log("data available after MediaRecorder.stop() called.");

            var clipName = document.querySelector('.info-display').innerText;
            var clipContainer = document.createElement('article');
            var clipLabel = document.createElement('p');
            var audio = document.createElement('audio');
            var deleteButton = document.createElement('button');

            clipContainer.classList.add('clip');
            clipLabel.classList.add('clip-label');
            audio.setAttribute('controls', '');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete';
            clipLabel.textContent = clipName;

            clipContainer.appendChild(audio);
            clipContainer.appendChild(clipLabel);
            clipContainer.appendChild(deleteButton);
            soundClips.appendChild(clipContainer);

            audio.controls = true;
            var blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
            chunks = [];
            var audioURL = window.URL.createObjectURL(blob);
            audio.src = audioURL;
            console.log("recorder stopped");

            deleteButton.onclick = function (e) {
                evtTgt = e.target;
                evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
                updateProgress();
            }
        }

        mediaRecorder.ondataavailable = function (e) {
            chunks.push(e.data);
        }
    }

    var onError = function (err) {
        console.log('The following error occurred: ' + err);
    }

    navigator.getUserMedia(constraints, onSuccess, onError);
} else {
    console.log('getUserMedia not supported on your browser!');
    document.querySelector('.info-display').innerText =
        'Your device does not support the HTML5 API needed to record audio (this is a known problem on iOS)';
}

function visualize() {
    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
        canvasCtx.beginPath();

        var sliceWidth = WIDTH * 1.0 / analyser.frequencyBinCount;
        var x = 0;

        for (var i = 0; i < analyser.frequencyBinCount; i++) {
            var v = dataArray[i] / 128.0;
            var y = (v * HEIGHT) / 2;

            if (i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
    }

    draw();
}

function endRecording() {
    if (mediaRecorder.state == 'inactive') {
        // The user has already pressed stop, so don't set up another word.
        return;
    }
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
    console.log("recorder stopped");
    record.style.background = "";
    record.style.color = "";
    setTimeout(startRecording, 1000);
}

function promptToSave() {
    if (confirm('Are you ready to upload your words?\nIf not, press cancel now,' +
        ' and then press Upload once you are ready.')) {
        saveRecordings();
    }
    upload.disabled = false;
}

var allClips;
var clipIndex;

function saveRecordings() {
    mediaStreamSource.disconnect();
    allClips = document.querySelectorAll('.clip');
    clipIndex = 0;
    uploadNextClip();
}

function uploadNextClip() {
    document.querySelector('.progress-display').innerText = 'Uploading clip ' +
        clipIndex + '/' + unrollWordCounts(getAllWantedWords()).length;
    var clip = allClips[clipIndex];
    clip.style.display = 'None';
    var audioBlobUrl = clip.querySelector('audio').src;
    var word = clip.querySelector('p').innerText;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', audioBlobUrl, true);
    xhr.responseType = 'blob';
    xhr.onload = function (e) {
        if (this.status == 200) {
            var blob = this.response;
            var ajaxRequest = new XMLHttpRequest();
            var uploadUrl = '/upload?word=' + word + '&_csrf_token=' + csrf_token;
            ajaxRequest.open('POST', uploadUrl, true);
            ajaxRequest.setRequestHeader('Content-Type', 'application/json');
            ajaxRequest.onreadystatechange = function () {
                if (ajaxRequest.readyState == 4) {
                    if (ajaxRequest.status === 200) {
                        clipIndex += 1;
                        if (clipIndex < allClips.length) {
                            uploadNextClip();
                        } else {
                            allDone();
                        }
                    } else {
                        alert('Uploading failed with error code ' + ajaxRequest.status);
                    }
                }
            };
            ajaxRequest.send(blob);
        }
    };
    xhr.send();
}

function allDone() {
    document.cookie = 'all_done=true; path=/';
    location.reload(true);
}
