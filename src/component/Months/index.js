import React, { useEffect, useState, useCallback, useMemo } from "react";

const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
];

const RenderMonths = ({ selectedMonth,monthClicked }) => {
    return (
        <>
            {persianMonths?.map((month,index) => (
                <div
                    key={month}
                    onClick={()=>monthClicked(index+1)}
                    className={`month-items ${
                        persianMonths[selectedMonth - 1] === month
                            ? "selected"
                            : ""
                    }`}
                >
                    {month}
                </div>
            ))}
        </>
    );
};

const Months = ({ month, clickEvent, monthTitleEnable }) => {
    const [monthState, setMonthState] = useState({
        months: persianMonths,
        monthPickerView: false,
        selectedMonth: 1,
    });

    let { months, selectedMonth, monthPickerView } = monthState;

    useEffect(() => {
        setMonthState((prevState) => ({ ...prevState, selectedMonth: month }));
    }, [month]);

    const openMonthsDatePicker = useCallback(() => {
        setMonthState((prevState) => ({
            ...prevState,
            monthPickerView: !monthPickerView,
        }));
    }, [monthPickerView]);

    const monthClicked = useCallback(
        (i) => {
            if (i <= 0 || i >= 13) return;
            clickEvent?.(i);
            setMonthState((prevState) => ({
                ...prevState,
                monthPickerView: false,
                selectedMonth: i,
            }));
        },
        [monthState]
    );

    const renderMonths = useMemo(
        () => (
            <div className="monthPicker">
                <RenderMonths selectedMonth={selectedMonth} monthClicked={monthClicked}/>
            </div>
        ),
        [selectedMonth]
    );

    return (
        <div className="JC-months">
            {monthTitleEnable && <span>ماه:{monthTitleEnable} </span>}
            <div className="holder">
                <div
                    onClick={() => monthClicked(selectedMonth - 1)}
                    className="prev"
                >
                    {"<"}
                </div>
                <div onClick={openMonthsDatePicker} className="print-month">
                    {months[selectedMonth - 1]}
                </div>
                <div
                    onClick={() => monthClicked(selectedMonth + 1)}
                    className="next"
                >
                    {">"}
                </div>
                {monthPickerView && renderMonths}
            </div>
        </div>
    );
};

export default Months;
