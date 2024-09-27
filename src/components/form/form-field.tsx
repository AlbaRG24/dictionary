import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

export const FormField = ({
  name,
  type,
}: {
  name: string;
  type: "input" | "text";
}) => {
  return (
    <Form.Item<string>
      label={name}
      name={name}
      rules={[
        {
          required: true,
          message: `Please provide the ${name}`,
        },
      ]}
    >
      {type === "input" ? <Input /> : <TextArea rows={4} />}
    </Form.Item>
  );
};
