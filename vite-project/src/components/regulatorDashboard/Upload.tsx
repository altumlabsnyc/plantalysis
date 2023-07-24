import React, { useEffect } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import '../assets/css/upload/bootstrap.min.css';
import '../assets/css/upload/upload.css';
import '../assets/css/upload/fileinput.min.css';
import '../assets/css/upload/all.css';
import '../assets/css/upload/jquery-ui.css';

const Upload: React.FC = () => {
  return (
    <div>
      <div className="container text-center mb-5 mt-5">
        <div className="row">
          <div className="col-md-12">
            <h4>  
              <a style={{ color: '#7646FF', textDecoration: "none"}} href="#" target="_blank">
                <b>Producer Upload Portal</b>
              </a>
            </h4>
          </div>
        </div>
      </div>
      <section className="bg-diffrent">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="file-upload-contain">
                <div className="file-input theme-explorer-fas file-input-ajax-new">
                  <div className="file-preview">
                        <div className="upload-area">
                          
                          <div>
                            <DropzoneArea
                              acceptedFiles={['.mzML']}
                              maxFileSize={3*1000*1000*1000}
                              filesLimit={10}
                              showFileNamesInPreview
                              useChipsForPreview
                              dropzoneText={'Drag and drop .mzML files here or Click to browse'}
                              onChange={(files) => console.log('Files:', files)}
                            />
                          </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="h-divider">OR</h1>
          <div className="wrapper">
            <div className="label" style={{ paddingLeft: '20px' }}>
              Search for your product:
            </div>
            <div className="searchBar">
              <input
                id="autocomplete"
                className="searchQueryInput ui-autocomplete-input"
                type="text"
                name="searchQueryInput"
                placeholder="Search using Batch ID, Delivery Date, Producer, Tester, etc."
                value=""
                autoComplete="off"
              />
              <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                  <path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      </div>
  );
};

export default Upload;
