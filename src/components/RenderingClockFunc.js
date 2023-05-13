export default function Clock(props) {
    const { id, name, timezone, handleCliceClose } = props;

    const nowTime = new Date();

    // function formatDate(date, timezone) {
    //     return date.getUTCFullYear() + '-' +
    //        (String(date.getUTCMonth() + 1).length === 1 ? '0' + (date.getUTCMonth() + 1) : date.getUTCMonth() + 1) + '-' +
    //        (String(date.getUTCDate()).length === 1 ? '0' + date.getUTCDate() : date.getUTCDate()) + 'T' +
    //        (String(date.getUTCHours()).length === 1 ? '0' + date.getUTCHours() : date.getUTCHours()) + ':' +
    //        (String(date.getUTCMinutes()).length === 1 ? '0' + date.getUTCMinutes() : date.getUTCMinutes()) + ':' +
    //        (String(date.getUTCSeconds()).length === 1 ? '0' + date.getUTCSeconds() : date.getUTCSeconds()) + '.' +
    //        (String(date.getUTCMilliseconds()).length === 1 ? '00' + date.getUTCMilliseconds() : 
    //         String(date.getUTCMilliseconds()).length === 2 ? '0' + date.getUTCMilliseconds() : date.getUTCMilliseconds()) +
    //        timezone;
    //     }
    // const date = new Date(Date.parse(formatDate(nowTime, timezone)))

    const updateTime = (Date.now() + (nowTime.getTimezoneOffset() * 60 * 1000)) + (timezone.replace(/[0]/g, '') * 60 * 60 * 1000)

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
                    <text x="-7" y="0" className="tiaText">{name + ' (' + timezone.slice(0, 3) + ':' + timezone.slice(3, 5) + ')'}</text>
                </svg>
                <span className="close" onClick={() => handleCliceClose(id)}>
                    &#10006;
                </span>
            </div>
            
        </>
    )
}