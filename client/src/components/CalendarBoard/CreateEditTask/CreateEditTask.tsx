import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Form, Input, Tooltip } from "antd";
import { CreateTaskRequest } from "../../../types/request/TasksRequest";
import { useForm } from "antd/es/form/Form";
import { CalendarDate } from "../../../types/calendar";
import { convertCalendarDateToString } from "../../../helpers/constants";

interface CreateEditTaskProps {
  close: () => void;
  createTask: (data: CreateTaskRequest) => void;
  cellDate: CalendarDate;
}

function CreateEditTask({ close, createTask, cellDate }: CreateEditTaskProps) {
  const [form] = useForm();

  const handleCreateTask = (data: CreateTaskRequest) => {
    createTask(data);
    close();
  };

  return (
    <div
      className="bg-white rounded-sm p-1 text-xs"
      onClick={(e) => e.stopPropagation()}
    >
      <Form
        className="text-xs"
        initialValues={{ title: "" }}
        onFinish={({ title }) =>
          handleCreateTask({
            title,
            date: convertCalendarDateToString(cellDate),
          })
        }
        form={form}
      >
        <Form.Item
          className="m-0"
          name={"title"}
          rules={[{ required: true, message: "" }]}
        >
          <Input className="text-xs" placeholder="Title..." />
        </Form.Item>
        <div className="flex justify-evenly">
          <Form.Item className="m-0">
            <Tooltip title={"Close"} placement="bottom">
              <CloseOutlined className="cursor-pointer" onClick={close} />
            </Tooltip>
          </Form.Item>
          <Form.Item className="m-0">
            <Tooltip title={"Save"} placement="bottom">
              <CheckOutlined
                className="cursor-pointer"
                onClick={() => form.submit()}
              />
            </Tooltip>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default CreateEditTask;
