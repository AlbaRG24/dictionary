import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, ConfigProvider } from "antd";
import React from "react";

const FormList = ({ listName: listName }: { listName: string }) => {
  const listItem = listName.slice(0, listName.length - 1);
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorText: "#164773"
          },
        },
      }}
    >
      <Form.Item label={listName}>
        <Form.List name={listName}>
          {(fields, { add, remove }) => (
            <>
              <div>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key}>
                    <Form.Item
                      name={name}
                      {...restField}
                      rules={[
                        {
                          required: true,
                          message: `Please provide at least 3 ${listItem}s`,
                        },
                      ]}
                    >
                      <Input placeholder={`${listItem} ${key + 1}`} />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </div>
                ))}
              </div>
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add {listItem}
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
    </ConfigProvider>
  );
};

export default FormList;
