let Styles = () => {
  return `
        
        .JDatePicker .monthPicker {
            position: absolute;
            right: -6px;
            width: 100%;
            background: #fff;
            text-align: center;
            padding: 5px;
            border-radius: 5px;
            top: 26px;
            box-shadow: 0px 0px 7px -2px #000;
            z-index: 1;
        }
        .JDatePicker .JC-days {
            position: relative;
            display: inline-block;
            background: #f7f7f7;
        }
        .JDatePicker .JC-days .holder {
            line-height: 24px;
        }
        
        .JDatePicker .JDheader .right, .JDatePicker .JDheader .left {
            display: inline-block;
            width: 50%;
        }
        .JDatePicker .JDheader select {
            width: 94%;
            border: none;
            border-bottom: 1px solid;
            padding: 0 20%;
        }
        .JDatePicker .JDheader .left{
            text-align: center;
        }
        .JDatePicker .JDheader .right .number {
            width: 70%;
            direction: ltr;
            text-align: center;
            display: inline-block;
        }
        .JDatePicker .JDheader .right .number:hover {
            border: 1px solid #ccc;
            cursor: text !important;
        }
        .JDatePicker .JDheader .right input[type="tel"] {
            width: 40%;
            z-index: 2;
            direction: ltr;
            text-align: center;
            display: inline-block;
            top: 8px;
            position: absolute;
        }
        .JDatePicker .JC-tooltip {
            position: absolute;
            background: #d9d9d9;
            z-index: 1;
            padding: 0px 10px;
        }
        .JDatePicker button {
            border: none;
            color: #fff;
            font-size: 16px;
            margin: 0 10px;
            width: 40px;
            height: 26px;
            border-radius: 5px;
        }
        .JDatePicker .JDsubmit{
            background: #7fc6ff;
        }
        .jdtrp > div {
            display: initial;
            margin: 0 6px;
        }
        `;
};
export default Styles;
