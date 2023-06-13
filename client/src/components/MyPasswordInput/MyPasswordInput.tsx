import { FC } from "react";
import { Form, Input } from "antd";
import { NamePath } from "antd/es/form/interface";

type MyPasswordInputProps = {
  dependencies?: NamePath[];
  name: string;
  placeholder: string;
};

export const MyPasswordInput: FC<MyPasswordInputProps> = ({
  name,
  placeholder,
  dependencies,
}) => {
  return (
    <Form.Item
      name={name}
      hasFeedback={true}
      dependencies={dependencies}
      rules={[
        { required: true, message: "обязательное поле" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value) {
              return Promise.resolve();
            }
            if (name === "confirmPassword") {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Пароли должны совпадать"));
            } else {
              if (value.length < 6) {
                return Promise.reject(
                  new Error("Пароли должен быть не менее 6 символов")
                );
              }
              const russianRegex = /[а-яА-Я]/;
              if (russianRegex.test(value)) {
                return Promise.reject(
                  new Error("Пароль не должен содержать русских символов!")
                );
              }
              return Promise.resolve();
            }
          },
        }),
      ]}
    >
      <Input.Password placeholder={placeholder} size="large" />
    </Form.Item>
  );
};
