import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "reactstrap";
import AlertComponent from "../alert";
import EditTask from "./editTask";
import Swal from "sweetalert2";
import {
  HeaderContainer,
  Btn,
  HeaderCard,
  IconFile,
  IconEdit,
  IconTrash,
} from "./styles";

function Tasks() {
  const state = useSelector((state) => state.tasks);
  const [task, setTask] = useState("");
  const [modal, setModal] = useState(false);
  const [dataTask, setDataTask] = useState(null);

  const [error, setError] = useState({
    status: false,
  });

  const dispatch = useDispatch();

  const inserTaskCallback = useCallback(async () => {
    if (!task.title) {
      return setError({
        status: true,
        message: "O título é obrigatório!",
        type: "danger",
      });
    }
    if (!task.description) {
      await Swal.fire({
        title: "Sua tarefa não tem descrição!",
        text: "Você está criando uma tarefa sem descrição deseja continuar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#77DD77",
        cancelButtonColor: "#ee6c4d",
        cancelButtonText: "Voltar",
        confirmButtonText: "Sim",
      }).then((result) => {
        if (result.value) {
          return dispatch({
            type: "INSERT_TASK",
            title: task.title,
            description: task.description,
          });
        }
      });
      return null;
    }
    return dispatch({
      type: "INSERT_TASK",
      title: task.title,
      description: task.description,
    });
  }, [task]);

  const setModalEditCallback = useCallback(
    (task) => {
      return (event) => {
        setDataTask(task);
        setModal(!modal);
      };
    },
    [modal]
  );

  const deleteUserCallback = useCallback((task) => {
    return (event) => {
      Swal.fire({
        title: "Tem certeza que deseja deletar essa tarefa?",
        text: "Essa ação não podera ser revertida",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#77DD77",
        cancelButtonColor: "#ee6c4d",
        cancelButtonText: "Voltar",
        confirmButtonText: "Sim",
      }).then((result) => {
        if (result.value) {
          console.log("teste");
          return dispatch({ type: "DELETE_TASK", id: task.id });
        }
      });
    };
  }, []);

  return (
    <>
      <AlertComponent
        error={error.status}
        setError={setError}
        type={error.type}
        message={error.message}
      />
      <div className="p-5">
        <div className="row">
          <HeaderContainer className="col-12 col-md-12 col-lg-6">
            <div>
              <Input
                placeholder="Titulo"
                value={task.title}
                error={error.status}
                onChange={(event) =>
                  setTask({
                    ...task,
                    title: event.target.value,
                  })
                }
                className="mr-5"
              />
            </div>
            <div className="mt-3">
              <Input
                placeholder="Descrição"
                type="textarea"
                value={task.description}
                error={error.status}
                onChange={(event) =>
                  setTask({
                    ...task,
                    description: event.target.value,
                  })
                }
              />
            </div>
            <div className="mt-4 d-flex justify-content-end">
              <Btn onClick={inserTaskCallback}>
                Cadastrar
                <IconFile />
              </Btn>
            </div>
          </HeaderContainer>
          <Card className="mt-2 w-100">
            <HeaderCard>
              <h3>Tarefas</h3>
            </HeaderCard>
            <CardBody>
              <div className="row">
                {state?.map((task) => {
                  return (
                    <div className="col-12 col-md-4 col-lg-4 mt-4">
                      <Card>
                        <CardHeader
                          style={{
                            backgroundColor: "#293241",
                            color: "white",
                          }}
                        >
                          {task.title}
                        </CardHeader>
                        <CardBody>
                          {(task.description?.length >= 90 &&
                            task.description.substring(0, 90) + " ...") ||
                            task.description}
                        </CardBody>
                        <CardFooter className="d-flex justify-content-end">
                          <Btn
                            color="#ee6c4d"
                            onClick={deleteUserCallback(task)}
                          >
                            <IconTrash />
                          </Btn>
                          <Btn
                            className="ml-2"
                            onClick={setModalEditCallback(task)}
                          >
                            Editar <IconEdit />
                          </Btn>
                        </CardFooter>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <EditTask modal={modal} setModal={setModal} data={dataTask} />
    </>
  );
}

export default Tasks;
