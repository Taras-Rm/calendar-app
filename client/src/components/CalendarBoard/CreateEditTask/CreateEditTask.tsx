import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { CreateTaskRequest } from "../../../types/request/TasksRequest";
import { useForm } from "antd/es/form/Form";
import { CalendarDate } from "../../../types/calendar";
import { convertCalendarDateToString } from "../../../helpers/constants";

interface CreateEditTaskProps {
  close: () => void;
  handleCreateTask: (data: CreateTaskRequest) => void;
  cellDate: CalendarDate;
}

function CreateEditTask({
  close,
  handleCreateTask,
  cellDate,
}: CreateEditTaskProps) {
  const [form] = useForm();

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
        <Form.Item className="m-0" name={"title"}>
          <Input className="text-xs" placeholder="Title..." />
        </Form.Item>
        <div className="flex justify-evenly">
          <Form.Item className="m-0">
            <CloseOutlined className="cursor-pointer" onClick={close} />
          </Form.Item>
          <Form.Item className="m-0">
            <CheckOutlined
              className="cursor-pointer"
              onClick={() => form.submit()}
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default CreateEditTask;
