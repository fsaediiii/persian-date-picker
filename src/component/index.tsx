import React, { FC, useCallback, useEffect, useState } from "react";
import moment from "moment-jalaali";
import Days from "./Days";
import Months from "./Months";
import Input from "./Input";
import Years from "./Year";
import DayOfWeek from "./Days/DayOfWeek";
import "./_mainDatePicker.css";

moment.loadPersian([]);

interface IJDatePickerComponent {
    containerClass?: string;
    id?: string;
    placeholder?: string;
    inputComponent?: any;
    monthTitleEnable?: string;
    value?: Date;
    onChange?: (newDate: Date) => void;
}

interface IDateState {
    selectedYear: number;
    currentMonth?: number;
    selectedMonthFirstDay?: Date;
    daysCount?: number;
    selectedDay?: string;
}

const JDatePicker: FC<IJDatePickerComponent> = ({
    containerClass,
    id,
    placeholder,
    inputComponent,
    monthTitleEnable,
    value,
    onChange,
}): JSX.Element => {
    const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
    const [date, setDate] = useState<IDateState>({
        selectedYear: parseInt(moment().format("jYYYY")),
        currentMonth: parseInt(moment().format("jMM")),
        selectedMonthFirstDay: moment(
            moment().format("jYYYY") + "/" + moment().format("jMM") + "/01",
            "jYYYY/jMM/jDD"
        ).weekday(),
        daysCount: 0,
        selectedDay: "",
    });

    const daysInMonth = (month: number, selectedYear: number) => {
        if (month > 0 && month < 7) return 31;
        else if (month > 6 && month < 12) return 30;
        else if (month === 12 && moment.jIsLeapYear(selectedYear)) return 30;
        else if (month === 12 && !moment.jIsLeapYear(selectedYear)) return 29;
    };

    useEffect(() => {
        setDate((prevSate) => ({
            ...prevSate,
            selectedDay: moment(value).format("jDD"),
            currentMonth: parseInt(moment(value).format("jMM")),
            selectedYear: parseInt(moment(value).format("jYYYY")),
        }));
    }, [value]);

    useEffect(() => {
        const dayInMonth = daysInMonth(
            moment().format("jMM"),
            moment().format("jYYYY")
        );
        setDate((prevSate) => ({
            ...prevSate,
            daysCount: dayInMonth ?? 0,
        }));
    }, []);

    const onClick = useCallback(
        (state: any) => {
            if (state) setOpenDatePicker(state);
            setOpenDatePicker(!openDatePicker);
        },
        [openDatePicker]
    );

    const firstDayOfMonth = (mo: number, ye: number) => {
        let month = mo.toString();
        let year = ye.toString();
        if (month.length === 1) month = "0" + month;
        setDate((prevSate) => ({
            ...prevSate,
            selectedMonthFirstDay: moment(
                year + "/" + month + "/01",
                "jYYYY/jMM/jDD"
            ).weekday(),
        }));
    };

    const monthsClicked = (month: number) => {
        let { selectedYear } = date;
        let year = selectedYear;
        console.log("month", month);
        let thisMonth = month;
        setDate((prevSate) => ({
            ...prevSate,
            daysCount: 0,
        }));

        if (month === 0) {
            setDate((prevSate) => ({
                ...prevSate,
                currentMonth: 12,
                daysCount: daysInMonth(12, selectedYear - 1) ?? 0,
                selectedYear: selectedYear - 1,
            }));
            thisMonth = 12;
            year = selectedYear - 1;
        } else if (month === 13) {
            setDate((prevSate) => ({
                ...prevSate,
                currentMonth: 1,
                daysCount: daysInMonth(1, selectedYear + 1) ?? 0,
                selectedYear: selectedYear + 1,
            }));
            thisMonth = 1;
            year = selectedYear + 1;
        } else
            setDate((prevSate) => ({
                ...prevSate,
                currentMonth: month,
                daysCount: daysInMonth(month, selectedYear) ?? 0,
            }));
        firstDayOfMonth(thisMonth, year);
    };

    const daysClicked = (momentDay: string) => {
        if (date.selectedDay !== momentDay) {
            setDate((prevState) => ({
                ...prevState,
                selectedDay: momentDay,
            }));
            const newDate = moment(
                `${date.selectedYear} ${date.currentMonth} ${momentDay}`,
                "jYYYY jMM jDD"
            ).format("YYYY/MM/DD");

            if (newDate) onChange?.(newDate);
            setOpenDatePicker(false);
        }
    };

    return (
        <div style={{ textAlign: "initial" }} className={containerClass}>
            <Input
                type="text"
                id={id}
                placeholder={placeholder}
                dir="ltr"
                readOnly
                value={value ? moment(value).format("jYYYY/jMM/jDD") : ""}
                onClick={onClick}
                component={inputComponent}
            />
            {openDatePicker && (
                <div className="JDatePicker">
                    <Months
                        monthTitleEnable={monthTitleEnable}
                        clickEvent={(returnedMonth: number) =>
                            monthsClicked(returnedMonth)
                        }
                        month={date?.currentMonth}
                    />

                    <div className="JDheader">
                        <div className="right">
                            <Years year={date?.selectedYear} />
                        </div>
                        <div className="left" />
                    </div>
                    <DayOfWeek />
                    <Days
                        selectedDay={date.selectedDay}
                        daysCount={date.daysCount}
                        firstDay={date.selectedMonthFirstDay}
                        clickEvent={(momentDay: any) => daysClicked(momentDay)}
                    />
                </div>
            )}
        </div>
    );
};

export default JDatePicker;
