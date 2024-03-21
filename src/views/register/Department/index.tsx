import { useEffect, useState } from "react";
import { Badge, Pagination, Table, Tooltip, message } from "antd";
import { Container } from "react-bootstrap";
import "./index.scss";

// Icones
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { FcInfo } from "react-icons/fc";
import { TbInfoSquareRoundedFilled } from "react-icons/tb";

// Components
import FiltersDepartment from "./components/filters";
import NewDepartment from "./components/newDepartment";

import { Department, QueryResponse } from "./services/types";
import { HttpRequestsDepartmentImpl } from "./services/http.request";
import { StorageServiceImpl } from "../../../services/storage";

const DepartmentComp = () => {
  const storage = new StorageServiceImpl();
  const httpRequest = new HttpRequestsDepartmentImpl();
  const [messageApi, contextHolder] = message.useMessage();
  const [rowSelected, setRowSelected] = useState<string[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [showFilters, setShowFilters] = useState(false);
  const [showNewDepartment, setShowNewDepartment] = useState(false);
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
    await getDepartments(filters);
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

  const handleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleNewDepartment = () => {
    setShowNewDepartment(!showNewDepartment);
  };

  const applyFilters = (applyFilter: { status: string; name: string }) => {
    if (Object.entries(applyFilter).length === 0) {
      storage.deleteData("filters_department");
      setFilters({});
    } else {
      storage.setData("filters_department", applyFilter);
      setFilters(applyFilter);
    }
    handleFilters();
    getDepartments(applyFilter, true);
  };

  useEffect(() => {
    const contain_filters = storage.getData("filters_department");
    if (contain_filters) {
      setFilters(contain_filters);
      getDepartments(contain_filters, true);
    } else {
      setFilters({});
      getDepartments(filters, true);
    }
    getEmployees();
  }, []);

  const getDepartments = async (
    filters: { name: string; status: string },
    resetPage: boolean = false
  ) => {
    const pagination = {
      page: resetPage ? 1 : dataSource.meta.page,
      perPage: dataSource.meta.perPage,
    };
    const query = {
      ...filters,
      ...pagination,
    };

    await httpRequest
      .findAllWithFilters(query)
      .then((res) => {
        setDataSource(res);
      })
      .catch((reason) => {
        messageApi.error("Erro ao buscar os departamentos 🥺");
        console.error(reason);
      });
  };

  const getEmployees = async () => {
    await httpRequest
      .findEmployeesCompany()
      .then((res) => {
        console.log(res);
      })
      .catch((reason) => {
        messageApi.error("Erro ao buscar os departamentos 🥺");
        console.error(reason);
      });
  };

  return (
    <>
      {contextHolder}
      <FiltersDepartment
        show={showFilters}
        handleClose={handleFilters}
        applyFilters={applyFilters}
        preFilters={filters}
      />
      <NewDepartment
        show={showNewDepartment}
        handleClose={handleNewDepartment}
      />
      <Container style={{ position: "relative" }} fluid="lg">
        <div className="actions">
          <div className="filters-actions">
            <div className="filter">
              <Tooltip title="Filtros" color={"var(--primary-color)"}>
                <Badge count={Object.keys(filters).length} size="small">
                  <FaFilter className="icon" onClick={handleFilters} />
                </Badge>
              </Tooltip>
            </div>
            <div className="actions">
              <button
                className="btn-default-size btn-standard"
                onClick={handleNewDepartment}
              >
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
                title="Inativar departamentos selecionados"
                color={"var(--primary-color)"}
              >
                <span className="button-action">Inativar</span>
              </Tooltip>
              <Tooltip
                title="Excluir departamentos selecionados"
                color={"var(--primary-color)"}
              >
                <span className="button-action">Excluir</span>
              </Tooltip>
              <Tooltip
                title="Só é possível excluir o departamento se não houver nenhum funcionário cadastrado no mesmo."
                color={"var(--primary-color)"}
              >
                <TbInfoSquareRoundedFilled
                  style={{ cursor: "help", fontSize: "17px" }}
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
export default DepartmentComp;
