import { Result } from "antd";

export const FailureMessage = () => (
  <Result
    status="warning"
    title="Something has gone wrong"
    extra={<a href="/contribute">Go back</a>}
  />
);
