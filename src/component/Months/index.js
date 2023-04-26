import React, { useEffect, useState } from 'react';

const persianMonths = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
];

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

    const monthClicked = (i) => {
        if (i <= 0 || i >= 13) return;
        clickEvent?.(i);
        setMonthState((prevState) => ({ ...prevState, monthPickerView: false, selectedMonth: i }));
    };

    const renderMonths = () => {
        let result = [];
        months?.forEach((item, index) => {
            if (selectedMonth === index + 1)
                result.push(
                    <div key={index + 1} className="month-items selected">
                        {item}
                    </div>
                );
            else
                result.push(
                    <div
                        key={index}
                        className="month-items"
                        onClick={(e) => monthClicked(index + 1, e)}
                    >
                        {item}
                    </div>
                );
        });
        return result;
    };

    return (
        <div className="JC-months">
            {monthTitleEnable && <span>ماه:{monthTitleEnable} </span>}
            <div className="holder">
                <div onClick={() => monthClicked(selectedMonth - 1)} className="prev">
                    {'<'}
                </div>
                <div
                    onClick={() => {
                        setMonthState((prevState) => ({
                            monthPickerView: !monthPickerView,
                            ...prevState,
                        }));
                    }}
                    className="print-month"
                >
                    {months[selectedMonth - 1]}
                </div>
                <div onClick={() => monthClicked(selectedMonth + 1)} className="next">
                    {'>'}
                </div>
                {monthPickerView && <div className="monthPicker">{renderMonths()}</div>}
            </div>
        </div>
    );
};

export default Months;
