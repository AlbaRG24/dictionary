import Breadcrumb from "antd/es/breadcrumb";
import styles from "../../styles/contribute/index.module.css";
import { Form, Input, Button, FormProps, ConfigProvider } from "antd";
import { Entry } from "../../hooks/useIdioms";
import TextArea from "antd/es/input/TextArea";
import FormList from "../../components/form/form-list/form-list";

export default function ContributePage() {
  const breadcrumbItems = [
    { title: <a href="/">Home</a> },
    { title: <a href="/contribute">Contribute</a> },
  ];

  const onFinish: FormProps<Entry>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<Entry>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <main>
      <Breadcrumb items={breadcrumbItems} className={styles.breadcrumb} />
      <div className={styles.formContainer}>
        <p className={styles.introduction}>
          We appreciate your contribution to our Idioms Dictionary. Your input
          helps us create a richer and more comprehensive resource for everyone.
        </p>
        <ConfigProvider
          theme={{
            components: {
              Form: {
                labelColor: "#164773",
                borderRadius: 5,
              },
            },
          }}
        >
          <Form
            name="idiom"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={styles.form}
          >
            <Form.Item<Entry>
              label="idiom"
              name="idiom"
              rules={[
                {
                  required: true,
                  message: "Please provide an idiom",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<Entry>
              label="meaning"
              name="meaning"
              rules={[{ required: true, message: "What does the idiom mean?" }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item<Entry>
              label="origin"
              name="origin"
              rules={[
                { required: true, message: "Please tell us about the origin" },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <FormList listName="examples" />
            <FormList listName="synonyms" />
            <Form.Item<Entry>
              label="source"
              name="source"
              rules={[
                {
                  required: true,
                  message: "Please provide an idiom",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.button}
                shape="round"
              >
                Add
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </main>
  );
}
