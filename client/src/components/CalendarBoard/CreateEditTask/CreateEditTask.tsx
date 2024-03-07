import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

interface CreateEditTaskProps {
  close: () => void;
}

function CreateEditTask({ close }: CreateEditTaskProps) {
  return (
    <div
      className="bg-white rounded-sm p-1 text-xs"
      onClick={(e) => e.stopPropagation()}
    >
      <Form className="text-xs">
        <Form.Item className="m-0">
          <Input className="text-xs" placeholder="Title..." />
        </Form.Item>
        <div className="flex justify-evenly">
          <Form.Item className="m-0">
            <CloseOutlined className="cursor-pointer" onClick={close} />
          </Form.Item>
          <Form.Item className="m-0">
            <CheckOutlined className="cursor-pointer" />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default CreateEditTask;
