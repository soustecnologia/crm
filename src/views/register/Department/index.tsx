import { Badge, Pagination, Table, Tooltip, message } from "antd";
import { Container } from "react-bootstrap";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { TbInfoSquareRoundedFilled } from "react-icons/tb";
import "./index.scss";

// Icones
import { FaFilter } from "react-icons/fa";
import { FcInfo } from "react-icons/fc";
import { useEffect, useState } from "react";
import { Department, QueryResponse } from "./types";
import { HttpRequestsDepartmentImpl } from "./services/http.request";

const Department = () => {
  const httpRequest = new HttpRequestsDepartmentImpl();
  const [messageApi, contextHolder] = message.useMessage();
  const [rowSelected, setRowSelected] = useState<string[]>([]);
  const [dataSource, setDataSource] = useState<QueryResponse>({
    departments: [],
    meta: {
      page: 1,
      perPage: 10,
      total: 0,
      totalPages: 1,
    },
  });

  const columns = [
    {
      title: "Departamento",
      dataIndex: "name",
    },
    {
      title: "Funcionários",
      dataIndex: "employees",
      render: (employees: any[]) => (
        <span>{employees?.length > 0 ? employees?.length : 0}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <span>
          {status === "A" ? (
            <AiOutlineCheckCircle style={{ color: "green" }} />
          ) : (
            <AiOutlineCloseCircle style={{ color: "red" }} />
          )}
        </span>
      ),
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

  const rowSelection = {
    onChange: (_: React.Key[], selectedRows: Department[]) => {
      setRowSelected([]);
      setRowSelected([...selectedRows.map((row) => row.id)]);
    },
    getCheckboxProps: (record: Department) => ({
      name: record.name,
    }),
  };

  const onChangePagination = async (page: number, pageSize: number) => {
    dataSource.meta.page = page;
    dataSource.meta.perPage = pageSize;
    await getDepartments();
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

  const getDepartments = async () => {
    const filters = {
      page: dataSource.meta.page,
      perPage: dataSource.meta.perPage,
    };
    await httpRequest
      .findAllWithFilters(filters)
      .then((res) => {
        setDataSource(res);
      })
      .catch((reason) => {
        messageApi.error("Erro ao buscar os departamentos 🥺");
        console.error(reason);
      });
  };

  useEffect(() => {
    getDepartments();
  }, []);
  return (
    <>
      {contextHolder}
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
                title="Excluir departamentos selecionados"
                color={"var(--primary-color)"}
              >
                <span className="inactiv">Excluir</span>
              </Tooltip>
              <Tooltip
                title="Só é possível excluir o departamento se não houver nenhum funcionário cadastrado no mesmo."
                color={"var(--primary-color)"}
              >
                <TbInfoSquareRoundedFilled
                  style={{ cursor: "pointer", fontSize: "20px" }}
                />
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
            dataSource={dataSource.departments}
            pagination={{
              position: ["none", "none"],
              pageSize: dataSource.meta.perPage,
            }}
          />
          <Pagination
            className="pagination-table"
            total={dataSource.meta.total}
            pageSize={dataSource.meta.perPage}
            current={dataSource.meta.page}
            showSizeChanger
            showQuickJumper
            onChange={onChangePagination}
            showTotal={(total) => `Total de ${total} itens`}
          />
        </div>
      </Container>
    </>
  );
};
export default Department;
