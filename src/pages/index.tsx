import Head from "next/head";
import { Inter } from "next/font/google";
import { useLoadScript } from "@react-google-maps/api";
import { fieldMetadata } from "../metaData/inputMetadata";
import InputField from "@/components/InputFileds/input_field";
import { Form } from "antd";
import { addVendor } from "@/utils/firestore";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCnLJMmRlWDOHvJzuiD9rODW0PGra65nH4",
    libraries: ["drawing", "geometry", "places"],
  });
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    const vendorAdded = await addVendor(values);
    form.resetFields();
    console.log(vendorAdded);
    window.alert(vendorAdded.message);
    // return <Popup message={vendorAdded.message} />;
  };
  const onChange = (values: any) => {
    // console.log(values);

    form.setFieldValue("lat", values.lat.toString());
    form.setFieldValue("lng", values.lng.toString());
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    console.log(form);
  };
  return (
    <>
      <Head>
        <title>FoodTolls Partner</title>
        <meta name="description" content="Generated by foodtolls" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.mainContainer}>
        <div className={styles.logoConatiner}>
          <img src="./LogoWhite.png" />
          <h1>
            Your Business{" "}
            <span style={{ color: "white" }}>Highway Companion!!</span>
          </h1>
          <h2>
            Help you{" "}
            <span style={{ color: "white" }}>achieve your business </span>{" "}
            goals.
          </h2>
        </div>
        <div className={styles.formContainer}>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, margin: "1rem" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            {fieldMetadata.map((fieldVal) => {
              return (
                <InputField
                  key={fieldVal.id}
                  fieldVal={fieldVal}
                  isLoaded={isLoaded}
                  onChange={onChange}
                />
              );
            })}
          </Form>
        </div>
      </div>
    </>
  );
}