import { Badge, Pagination, Table, Tooltip } from "antd";
import { Container } from "react-bootstrap";
import "./index.scss";

// Icones
import { FaFilter } from "react-icons/fa";
import { FcInfo } from "react-icons/fc";
import { useState } from "react";

interface DataType {
  id: string;
  companyId: string;
  name: string;
  employees: number;
  status: string;
}

const Department = () => {
  const [rowSelected, setRowSelected] = useState<string[]>([]);

  const columns = [
    {
      title: "Departamento",
      dataIndex: "name",
    },
    {
      title: "Funcionários",
      dataIndex: "employees",
    },
    {
      title: "",
      dataIndex: "",
      width: 70,
      render: (_: any, record: any) => (
        <Tooltip title="Sobre o departamento" color={"var(--primary-color)"}>
          <FcInfo
            style={{ cursor: "pointer", fontSize: "19px" }}
            onClick={() => aboutDepartment(record)}
          />
        </Tooltip>
      ),
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      id: `id-${i}`,
      companyId: `id-${i}`,
      name: `Departamento ${i}`,
      employees: Math.floor(Math.random() * 20),
      status: "A",
    });
  }

  const rowSelection = {
    onChange: (_: React.Key[], selectedRows: DataType[]) => {
      setRowSelected([]);
      setRowSelected([...selectedRows.map((row) => row.id)]);
    },
    getCheckboxProps: (record: DataType) => ({
      name: record.name,
    }),
  };

  const onChange = (event: any) => {
    console.log(event);
  };

  const aboutDepartment = (record: any) => {
    console.log(record);
  };

  const qtdSelectedMsg = (qtd: number) => {
    if (qtd > 1) {
      return `${qtd} Selecionados`;
    } else {
      return `${qtd} Selecionado`;
    }
  };
  return (
    <>
      <Container style={{ position: "relative" }} fluid="lg">
        <div className="actions">
          <div className="filters-actions">
            <div className="filter">
              <Tooltip title="Filtros" color={"var(--primary-color)"}>
                <Badge count={rowSelected.length} size="small">
                  <FaFilter className="icon" />
                </Badge>
              </Tooltip>
            </div>
            <div className="actions">
              <button className="btn-default-size btn-standard">
                Criar novo
              </button>
            </div>
          </div>
          <div
            className={`action-itens-selected ${
              rowSelected.length > 0 ? "active" : ""
            }`}
          >
            <span className="qtd">{qtdSelectedMsg(rowSelected.length)}</span>
            <div className="btns">
              <Tooltip
                title="Exportar contatos selecionados"
                color={"var(--primary-color)"}
              >
                <span className="export">Exportar</span>
              </Tooltip>
              <Tooltip
                title="Inativar contatos selecionados"
                color={"var(--primary-color)"}
              >
                <span className="inactiv">Inativar</span>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="table-departments">
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            rowKey={(row) => row.id}
            columns={columns}
            dataSource={data}
            pagination={{ position: ["none", "none"] }}
          />
          <Pagination
            className="pagination-table"
            total={data.length}
            showSizeChanger
            showQuickJumper
            onChange={onChange}
            showTotal={(total) => `Total ${total} items`}
          />
        </div>
      </Container>
    </>
  );
};
export default Department;
