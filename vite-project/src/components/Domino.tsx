import React from 'react'

interface Checkpoint {
  checkpointLabel: string
  date: string
}

interface ProgressBarProps {
  overallProgress: number
  checkpoints: Checkpoint[]
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  overallProgress,
  checkpoints,
}) => {
  return (
    <div className="container mx-auto py-8 bg-background">
      <div className="relative h-8 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 bg-green-600 h-full"
          style={{ width: `${overallProgress}%`, borderRadius: 'inherit' }}
        ></div>
        {checkpoints.map((checkpoint, index) => {
          const checkpointProgress = (index + 1) * 10
          const leftPosition = (checkpointProgress * 100) / 70 // Adjust the positioning of white balls
          return (
            <React.Fragment key={index}>
              <div
                className="absolute h-8 flex justify-center items-center"
                style={{
                  width: `${checkpointProgress}%`,
                  left: `${leftPosition}%`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                <div
                  className={`h-6 w-6 rounded-full bg-white border-4 border-green-600`}
                ></div>
              </div>
            </React.Fragment>
          )
        })}
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {checkpoints.map((checkpoint, index) => (
          <div key={index} className="text-center">
            <span
              className={`text-xs font-semibold uppercase ${
                (index + 1) * 10 <= overallProgress
                  ? 'text-green-600'
                  : 'text-gray-500'
              }`}
            >
              {checkpoint.checkpointLabel}
            </span>
            <span
              className={`block text-xs ${
                (index + 1) * 10 <= overallProgress
                  ? 'text-green-600'
                  : 'text-gray-500'
              }`}
            >
              {checkpoint.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const App: React.FC = () => {
  const overallProgress = 50
  const checkpoints: Checkpoint[] = [
    { checkpointLabel: 'Checkpoint 1', date: 'Date 1' },
    { checkpointLabel: 'Checkpoint 2', date: 'Date 2' },
    { checkpointLabel: 'Checkpoint 3', date: 'Date 3' },
    { checkpointLabel: 'Checkpoint 4', date: 'Date 4' },
  ]

  return (
    <ProgressBar overallProgress={overallProgress} checkpoints={checkpoints} />
  )
}

export default App
