import Breadcrumb from "antd/es/breadcrumb";
import styles from "../../styles/contribute/index.module.css";
import { Form, Input, Button, ConfigProvider } from "antd";
import { Entry } from "../../hooks/useIdioms";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useSession } from "next-auth/react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import uuid from "uuid-random";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { FormItem } from "../../components/form/FormItem";
import { FormSuccessMessage } from "../../components/messages/form-success-message";
import { FormFailureMessage } from "../../components/messages/form-failure-message";

const idiomsUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export default function ContributePage() {
  const { data: session } = useSession();
  const breadcrumbItems = [
    { title: <a href="/">Home</a> },
    { title: <a href="/contribute">Contribute</a> },
  ];

  const postIdiom = (entry: Entry) => {
    const response = fetch(`${idiomsUrl}/idioms`, {
      method: "POST",
      body: JSON.stringify(entry),
    });
    return response;
  };

  const mutation = useMutation({
    mutationFn: postIdiom,
  });

  const onFinish = (values: any) => {
    console.log("Successful mutation: ", values);
    mutation.mutate({
      id: uuid(),
      idiom: values.idiom,
      meaning: values.meaning,
      origin: values.origin,
      examples: values.examples,
      synonyms: values.synonyms,
      source: values.source,
      author: session?.user?.name || "unknown author",
    });
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<Entry>) => {
    console.log(
      "Form submission failed. Please check your input and try again.",
      errorInfo
    );
  };

  return (
    <main>
      <Breadcrumb items={breadcrumbItems} className={styles.breadcrumb} />
      {mutation.isSuccess ? (
        <FormSuccessMessage />
      ) : mutation.isError ? (
        <FormFailureMessage />
      ) : (
        <div className={styles.formContainer}>
          <p className={styles.introduction}>
            We appreciate your contribution. Your input helps us create a richer
            and more comprehensive resource for everyone.
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
            <Form<Entry>
              name="entry"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className={styles.form}
            >
              <FormItem name="idiom" type="input" />
              <FormItem name="meaning" type="text" />
              <FormItem name="origin" type="text" />

              <Form.Item label="examples" required={true}>
                <Form.List name="examples">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} className={styles.fieldItemContainer}>
                          <Form.Item
                            key={key}
                            name={name}
                            {...restField}
                            className={styles.exampleFormItem}
                            rules={[
                              {
                                required: true,
                                message: `Please provide at least 1 example`,
                              },
                            ]}
                          >
                            <Input placeholder="example" />
                          </Form.Item>
                          <MinusCircleOutlined
                            onClick={() => remove(name)}
                            className={styles.removeItemIcon}
                          />
                        </div>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add example
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>
              <Form.Item label="synonyms" required={true} name="synonyms">
                <Form.List name="synonyms">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} className={styles.fieldItemContainer}>
                          <Form.Item
                            {...restField}
                            name={[name, "word"]}
                            noStyle
                            rules={[
                              {
                                required: true,
                                message: "Please input a synonym",
                              },
                            ]}
                          >
                            <Input
                              className={`${styles.smallInputField} ${styles.marginRight}`}
                              placeholder="synonym"
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "url"]}
                            noStyle
                            rules={[
                              {
                                required: true,
                                message: "Please input the URL",
                              },
                            ]}
                          >
                            <Input
                              className={styles.smallInputField}
                              placeholder="URL"
                            />
                          </Form.Item>
                          <MinusCircleOutlined
                            onClick={() => remove(name)}
                            className={styles.removeItemIcon}
                          />
                        </div>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add synonym
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>
              <Form.Item label="Source" required={true}>
                <Form.Item
                  name={["source", "name"]}
                  noStyle
                  rules={[
                    { required: true, message: "Please input the source name" },
                  ]}
                >
                  <Input
                    className={`${styles.smallInputField} ${styles.marginRight}`}
                    placeholder="Source"
                  />
                </Form.Item>
                <Form.Item
                  name={["source", "url"]}
                  noStyle
                  rules={[{ required: true, message: "Please input the URL" }]}
                >
                  <Input
                    className={styles.smallInputField}
                    placeholder="URL"
                  />
                </Form.Item>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.button}
                  shape="round"
                >
                  {mutation.isPending ? <div>Loading...</div> : "Add"}
                </Button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      )}
    </main>
  );
}
