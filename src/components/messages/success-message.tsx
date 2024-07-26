import { Result } from "antd";

export const SuccessMessage = () => (
  <Result
    status="success"
    title="Your entry has been successfully saved!"
    subTitle="Thanks for your contribution!"
    extra={[
      <a href="/contribute">Contribute again</a>,
    ]}
  />
);
