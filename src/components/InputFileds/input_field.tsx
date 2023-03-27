import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import styles from "./maps.module.css";
import MapComponent from "../mapcomponent/map_component";
type Props = {
  fieldVal: {
    id: number;
    name: string;
    label: string;
    type: string;
    validators: {
      required?: boolean;
      pattern?: RegExp;
      max?: number;
      message?: string;
    };
    hasButton?: boolean;
    button?: { label: string; action: string };
  };
  isLoaded: boolean;
  onChange: (values: any) => void;
};
const { TextArea } = Input;
const InputField: React.FC<Props> = ({ fieldVal, isLoaded, onChange }) => {
  const [showMap, setShowMap] = useState(true);
  const setLatLong = (e: any) => {
    onChange(JSON.parse(e));
  };
  switch (fieldVal.type) {
    case "text":
      return (
        <>
          {
            <Form.Item
              label={
                <label
                  style={{
                    color: "black",
                    fontWeight: "bolder",
                    fontSize: "20px",
                  }}
                >
                  {fieldVal.label}
                </label>
              }
              name={fieldVal.name}
              rules={[
                { required: true, message: `${fieldVal.label} is required` },
              ]}
            >
              <Input
                style={{ border: "2px solid #ffa39e", fontSize: "20px" }}
              />
            </Form.Item>
          }
        </>
      );
    case "textArea":
      return (
        <>
          {
            <Form.Item
              label={
                <label
                  style={{
                    color: "black",
                    fontWeight: "bolder",
                    fontSize: "20px",
                  }}
                >
                  {fieldVal.label}
                </label>
              }
              name={fieldVal.name}
              rules={[
                { required: true, message: `${fieldVal.label} is required` },
                { max: 200, message: "Maximum character allowed is 200" },
              ]}
            >
              <TextArea
                style={{ border: "2px solid #ffa39e", fontSize: "20px" }}
              />
            </Form.Item>
          }
        </>
      );
    case "map":
      return (
        <>
          <div className={styles.mapsConatiner}>
            <Button
              style={{
                color: "red",
                border: "1px solid crimson",
                margin: "5px",
              }}
              onClick={() => setShowMap(!showMap)}
            >
              Show Map
            </Button>
          </div>
          {showMap && (
            <div className={styles.mapClass}>
              {isLoaded && <MapComponent setLatLong={setLatLong} />}
            </div>
          )}
        </>
      );
    case "number":
      return (
        <>
          {
            <Form.Item
              label={
                <label
                  style={{
                    color: "black",
                    fontWeight: "bolder",
                    fontSize: "20px",
                  }}
                >
                  {fieldVal.label}
                </label>
              }
              name={fieldVal.name}
              rules={[
                { required: true, message: `${fieldVal.label} is required` },
                fieldVal.validators.pattern
                  ? {
                      pattern: fieldVal.validators.pattern,
                      message: `${fieldVal.label} is not valid`,
                    }
                  : {},
              ]}
            >
              <Input
                style={{ border: "2px solid #ffa39e", fontSize: "20px" }}
              />
            </Form.Item>
          }
        </>
      );
    case "button":
      return (
        <>
          {
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          }
        </>
      );
    default:
      return <></>;
  }
};

export default InputField;
