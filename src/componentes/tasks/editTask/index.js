import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AlertComponent from "../../alert";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "reactstrap";
import Swal from "sweetalert2";

function EditTask({ modal, setModal, data }) {
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    title: data?.title,
    description: data?.description,
  });
  const [error, setError] = useState({
    status: false,
  });

  useEffect(() => {
    setTask({
      ...data,
      title: data?.title,
      description: data?.description,
    });
  }, [data]);

  const setModalCallback = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const dispatchTaskCallback = useCallback(async () => {
    dispatch({
      type: "UPDATE_TASK",
      id: task.id,
      title: task.title,
      description: task.description,
    });
    setModalCallback();
    await Swal.fire({
      icon: "success",
      title: "Sucesso",
      text: "Sua tarefa foi atualizada!",
    });
  }, [task]);
  console.log(task);
  return (
    <>
      <AlertComponent
        error={error.status}
        setError={setError}
        type={error.type}
        message={error.message}
      />
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
    </>
  );
}

export default EditTask;
