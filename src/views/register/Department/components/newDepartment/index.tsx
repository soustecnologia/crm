import { Offcanvas } from "react-bootstrap";
import "./index.scss";

const NewDepartment = ({ show, handleClose }: any) => {
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
            <span className="title-offcanvas"> Novo Departamento</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <span>New Department</span>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NewDepartment;
