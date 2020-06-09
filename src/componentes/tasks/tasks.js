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

function Tasks() {
  const state = useSelector((state) => state.tasks);
  const [task, setTask] = useState("");
  const [error, setError] = useState({
    status: false,
  });

  console.log(state);

  const dispatch = useDispatch();

  const inserTaskCallback = useCallback(() => {
    if (!task.title) {
      return setError({
        status: true,
        message: "O titulo é obrigatorio!",
        type: "danger",
      });
    }
    return dispatch({
      type: "INSERT_TASK",
      title: task.title,
      description: task.description,
    });
  }, [task]);

  console.log("asdasd");

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
          <div className="col-12">
            <div className="d-flex ">
              <Input
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
              <Button color="success" onClick={inserTaskCallback}>
                Cadastrar
              </Button>
            </div>
            <div className="mt-4">
              <Input
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
            <div className="row">
              {state?.map((task) => {
                return (
                  <div className="col-12 col-md-4 col-lg-4 mt-4">
                    <Card>
                      <CardHeader>{task.title}</CardHeader>
                      <CardBody>{task.description}</CardBody>
                      <CardFooter className="d-flex justify-content-end">
                        <Button
                          color="danger"
                          onClick={() =>
                            dispatch({ type: "DELETE_TASK", id: task.id })
                          }
                        >
                          Excluir
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tasks;
