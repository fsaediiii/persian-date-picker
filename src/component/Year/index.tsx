import React, { createRef, useEffect, useRef, useState } from "react";

const mapObj = {
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
    0: "۰",
};

const Years = (props: any) => {
    const [year, setYear] = useState({
        year: 0,
        error: "",
    });
    const yearRef = useRef<any>(null);

    useEffect(() => {
        setYear((prevState) => ({
            ...prevState,
            year: props.year,
        }));
    }, [props.year]);

    const yearChanged = () => {
        if (!yearRef.current.value) return;
        const { value } = yearRef.current;

        let { changeEvent } = props;
        setYear((prevState) => ({
            ...prevState,
            year: value,
        }));
        if (value.length == 4 && value > 1300 && value < 1500)
            changeEvent?.(parseInt(value));
        //   setYear({ editable: false, error: "" });
        // } else this.setState({ error: "سال ۴ رقم و درفاصله ۱۳۰۰ تا ۱۵۰۰ باشد" });
    };

    let yearString = year.year
        .toString()
        //@ts-ignore
        .replace(/1|2|3|4|5|6|7|8|9|0/gi, function (e) {
            //@ts-ignore
            return mapObj[e];
        });
    console.log("year", year);

    return (
        <div>
            {/* {editable && (
            <div
                // onClick={yearChanged}
                style={{
                    content: "&quot;&quot",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: "0px",
                    zIndex: "1",
                    left: "0px",
                }}
            /> */}
            {/* )} */}
            {/* {editable && ( */}
            <span
                className="number"
                style={{ cursor: "pointer" }}
                // onClick={() => this.setState({ editable: true })}
            >
                {yearString}
            </span>
            {/* )} */}
            {/* {editable && ( */}
            <input
                type="tel"
                ref={yearRef}
                placeholder="سال"
                onChange={yearChanged}
                // onBlur={yearChanged}
                value={year.year}
            />
            {/* )} */}
            {year.error && (
                <div className="JC-tooltip">
                    <p style={{ color: "red" }}>{year.error}</p>
                </div>
            )}
        </div>
    );
};

export default Years;
