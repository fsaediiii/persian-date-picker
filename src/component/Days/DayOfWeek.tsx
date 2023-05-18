import { memo } from "react";

const DayOfWeek = () => {
    return (
        <div className="days-titles">
            <div>ج</div>
            <div>پ</div>
            <div>چ</div>
            <div>س</div>
            <div>د</div>
            <div>ی</div>
            <div>ش</div>
        </div>
    );
};

export default memo(DayOfWeek);
