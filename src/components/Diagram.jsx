import { hero } from '../content'

// The timestamps are the argument: intake at 09:41:02, playbook check 45
// seconds later, quote back inside two minutes, bound at 09:52:30. One complete
// placement in about eleven minutes. The names are deliberate placeholders, so
// the log cannot be read as real client data.
const columns = ['Time', 'Task', 'Status']

const entries = [
  { time: '09:41:02', task: 'Submission intake: Sample Insured LLC', status: 'pending' },
  { time: '09:41:47', task: 'Playbook check: appetite match', status: 'governed' },
  { time: '09:43:15', task: 'Quote returned: 3 carriers', status: 'governed' },
  { time: '09:52:30', task: 'Bound: Demo Carrier Co.', status: 'executed' },
]

export default function Diagram() {
  const { diagram } = hero

  return (
    <figure
      className="diagram"
      aria-label="Activity log from a live placement: a submission intake, a playbook check, a quote back from three carriers, and the policy bound, all inside eleven minutes"
    >
      <p className="diagram__label">
        <i className="diagram__live" aria-hidden="true" />
        {diagram.label}
      </p>

      <div className="diagram__stage">
        <div className="diagram__card">
          <table className="log">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map(({ time, task, status }) => (
                <tr key={time}>
                  <td className="log__time">{time}</td>
                  <td className="log__task">{task}</td>
                  <td className="log__status" data-status={status}>
                    <i className="log__dot" aria-hidden="true" />
                    {status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="diagram__footer">
        <span className="diagram__footer-label">{diagram.footerLabel}</span>
        <span className="diagram__duration">{diagram.duration}</span>
      </div>
    </figure>
  )
}
