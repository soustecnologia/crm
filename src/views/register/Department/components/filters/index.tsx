import { Offcanvas } from "react-bootstrap";
import "./index.scss";

const FiltersDepartment = ({ show, handleClose }: any) => {
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
          <span>Filters</span>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FiltersDepartment;
