import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "reactstrap";

function EditTask({ modal, setModal, data }) {
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    title: data?.title,
    description: data?.description,
  });

  useEffect(() => {
    setTask({
      ...data,
      title: data?.title,
      description: data?.description,
    });
  }, [data]);

  const setModalCallback = useCallback(() => {
    setTask(null);
    setModal(!modal);
  }, [modal]);

  const dispatchTaskCallback = useCallback(() => {
    dispatch({
      type: "UPDATE_TASK",
      id: task.id,
      title: task.title,
      description: task.description,
    });
    setModalCallback();
  }, [task]);

  return (
    <Modal isOpen={modal} toggle={setModalCallback}>
      <ModalHeader toggle={setModalCallback}>Editar Tarefa</ModalHeader>
      <ModalBody>
        <div>
          <label>Titulo:</label>
          <Input
            value={task?.title}
            defaultValue={data?.title}
            onChange={(event) =>
              setTask({
                ...task,
                title: event.target.value,
              })
            }
          />
        </div>
        <div className="mt-2">
          <label>Descrição:</label>
          <Input
            value={task?.description}
            defaultValue={data?.description}
            type="textarea"
            onChange={(event) =>
              setTask({
                ...task,
                description: event.target.value,
              })
            }
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={dispatchTaskCallback}>
          Enviar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default EditTask;
