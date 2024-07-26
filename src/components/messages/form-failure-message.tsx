import { Result } from "antd";

export const FormFailureMessage = () => (
  <Result
    status="warning"
    title="Something has gone wrong"
    extra={<a href="/contribute">Go back</a>}
  />
);
