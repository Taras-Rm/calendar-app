import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, ColorPicker, Form, Input, Modal } from "antd";
import { LabelsService } from "../../../services/LabelsService";
import Label from "./Label";

interface LabelsModalProps {
  isOpen: boolean;
  close: () => void;
}

function LabelsModal({ isOpen, close }: LabelsModalProps) {
  const queryClient = useQueryClient();

  const { data: { data: labels = [] } = {} } = useQuery({
    queryKey: ["labels"],
    queryFn: () => LabelsService.getLabels(),
    enabled: isOpen,
  });

  const { mutate: createLabelMutation } = useMutation({
    mutationFn: LabelsService.createLabel,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["labels"],
      });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  return (
    <Modal open={isOpen} onCancel={close} footer={null}>
      <div className="mb-3">
        <h3 className="mb-2 text-lg">Available labels</h3>
        <div className="space-y-1">
          {labels.map((l) => (
            <Label key={l.id} label={l} />
          ))}
        </div>
      </div>
      <div>
        <div className="mb-2 text-lg">Add new label</div>
        <Form
          initialValues={{
            text: "",
            color: null,
          }}
          onFinish={({ text, color }) =>
            createLabelMutation({ text, color: color.toHex() })
          }
        >
          <div className="flex justify-between space-x-2 mb-2">
            <Form.Item
              className="m-0"
              name={"color"}
              required
            >
              <ColorPicker format="hex" />
            </Form.Item>
            <Form.Item
              className="w-full m-0"
              name={"text"}
              rules={[{ required: true }]}
            >
              <Input placeholder="Text..." />
            </Form.Item>
          </div>
          <Form.Item>
            <Button htmlType="submit">Add</Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default LabelsModal;
