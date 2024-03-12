import { useQuery } from "@tanstack/react-query";
import { Button, Collapse, ColorPicker, Form, Input, Modal } from "antd";
import { LabelsService } from "../../../services/LabelsService";
import Label from "./Label";

interface LabelsModalProps {
  isOpen: boolean;
  close: () => void;
}

function LabelsModal({ isOpen, close }: LabelsModalProps) {
  const { data: { data: labels = [] } = {} } = useQuery({
    queryKey: ["labels"],
    queryFn: () => LabelsService.getLabels(),
    enabled: isOpen,
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
        <Form>
          <div className="flex justify-between space-x-2 mb-2">
            <Form.Item className="m-0">
              <ColorPicker defaultValue="#1677ff" />
            </Form.Item>
            <Form.Item className="w-full m-0">
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
