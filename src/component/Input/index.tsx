import { FC, InputHTMLAttributes, PropsWithChildren, ReactNode } from "react";

interface IInputComponent extends InputHTMLAttributes<HTMLInputElement> {
    component: any;
}

const InputComponent: FC<PropsWithChildren<IInputComponent>> = (props): JSX.Element => {
    const { component: Component, ...rest } = props;
    return !!Component ? <Component {...rest} /> : <input {...rest} />;
};

export default InputComponent;
