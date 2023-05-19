export default function Clock(props) {
    const { id, name, timezone, handleCliceClose } = props;

    const nowTime = new Date();

    let tiaText;

    const timezoneMultiplier = (timezone) => {
        if (timezone.length === 5) {
            tiaText = name + ' (' + timezone.slice(0, 3) + ':' + timezone.slice(3, 5) + ')'
            const multiplier = (Number(timezone[1] + timezone[2]) + Number(timezone[3] === '3' ? 0.5 : timezone[3] === '4' ? 0.75 : 0));
            if (timezone[0] === '-') {
                return '-' + multiplier
            }
            return multiplier
        }
        if (timezone.length === 4) {
            tiaText = name + ' (' + timezone.slice(0, 2) + ':' + timezone.slice(2, 4) + ')'
            return Number(timezone[0] + timezone[1]) + Number(timezone[2] === '3' ? 0.5 : timezone[2] === '4' ? 0.75 : 0)
        }
    }

    

    const updateTime = (Date.now() + (nowTime.getTimezoneOffset() * 60 * 1000)) + (timezoneMultiplier(timezone) * 60 * 60 * 1000)

    const currentTime = new Date(updateTime)

    return (
        <>
            <div className="clock">
                <svg viewBox="0 0 40 40" style={ 
                    { '--start-seconds': currentTime.getSeconds(), 
                      '--start-minutes': currentTime.getMinutes(),
                      '--start-hours': currentTime.getHours() % 12 } }>
                    <circle cx="20" cy="20" r="19" />
                    <g className="marks">
                        <line x1="15" y1="0" x2="16" y2="0" />
                        <line x1="15" y1="0" x2="16" y2="0" />
                        <line x1="15" y1="0" x2="16" y2="0" />
                        <line x1="15" y1="0" x2="16" y2="0" />
                        <line x1="15" y1="0" x2="16" y2="0" />
                        <line x1="15" y1="0" x2="16" y2="0" />
                        <line x1="15" y1="0" x2="16" y2="0" />
                        <line x1="15" y1="0" x2="16" y2="0" />
                        <line x1="15" y1="0" x2="16" y2="0" />
                        <line x1="15" y1="0" x2="16" y2="0" />
                        <line x1="15" y1="0" x2="16" y2="0" />
                        <line x1="15" y1="0" x2="16" y2="0" />
                    </g>
                    <line x1="0" y1="0" x2="9" y2="0" className="hour" />
                    <line x1="0" y1="0" x2="13" y2="0" className="minute" />
                    <line x1="0" y1="0" x2="16" y2="0" className="seconds" />
                    <circle cx="20" cy="20" r="0.7" className="pin" />
                    <text x="-7" y="0" className="tiaText">{tiaText}</text>
                </svg>
                <span className="close" onClick={() => handleCliceClose(id)}>
                    &#10006;
                </span>
            </div>
            
        </>
    )
}