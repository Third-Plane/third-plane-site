import { ticker } from '../content'

export default function Ticker() {
  // Rendered twice so the marquee loop is seamless at -50% translation.
  const items = [...ticker, ...ticker]

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {items.map((item, i) => (
          <span className="ticker__item" key={`${item}-${i}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
