import { Offcanvas } from "react-bootstrap";
import { Form, Input, Radio, RadioChangeEvent } from "antd";
import "./index.scss";
import { useEffect, useState } from "react";

const FiltersDepartment = ({
  show,
  handleClose,
  applyFilters,
  preFilters,
}: any) => {
  const [filters, setFilters] = useState({ name: "", status: "" });

  useEffect(() => {
    setFilters({ ...filters, ...preFilters });
  }, [preFilters]);

  const onChangeStatus = (e: RadioChangeEvent) => {
    setFilters({
      ...filters,
      status: e.target.value,
    });
  };
  const onChangeName = (e: any) => {
    setFilters({
      ...filters,
      name: e.target.value,
    });
  };

  const apply = () => {
    let apply: any = { ...filters };
    if (apply.name === "") delete apply.name;
    if (apply.status === "") delete apply.status;
    applyFilters(apply);
  };

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={"end"}
        scroll={true}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <span className="title-offcanvas"> Filtros</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form layout="vertical">
            <Form.Item label="Departamento">
              <Input
                placeholder="Nome do departamento"
                onChange={onChangeName}
                value={filters.name}
              />
            </Form.Item>
            <Form.Item label="Status">
              <Radio.Group
                style={{ display: "flex", justifyContent: "center" }}
                onChange={onChangeStatus}
                value={filters.status}
              >
                <Radio value="">Todos</Radio>
                <Radio value="A">Ativos</Radio>
                <Radio value="I">Inativos</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <button onClick={apply} className="button-filter">
                Aplicar Filtros
              </button>
            </Form.Item>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FiltersDepartment;
