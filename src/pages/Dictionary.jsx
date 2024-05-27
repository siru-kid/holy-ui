import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { axiosPrivate } from "~/_api";
import Loading from "~/components/Loading";
import EnhancedTable from "~/components/table/EnhancedTable";
import config from "~/constants/endpoints.json";

const currentConfig = import.meta.env.MODE === "development" ? config.test : config.prod;

const COLUMNS = [
  {
    Header: "Page Type",
    accessor: "page_type"
  },
  {
    Header: "Key",
    accessor: "key"
  },

  {
    Header: "Tenant Name",
    accessor: "tenant_name"
  },
  {
    Header: "English",
    accessor: "english"
  },
  {
    Header: "Tigrinia",
    accessor: "tigrinia"
  },
  {
    Header: "Spanish",
    accessor: "spanish"
  },
  {
    Header: "Updated By",
    accessor: "updated_by"
  },

  {
    Header: "Updated At",
    accessor: "updated_at",

    type: "date"
  },
  {
    Header: "Action",
    accessor: "action"
  }
];

const Dictionary = ({ populateDictionaryForm, deleteDictionary }) => {
  const [data, setData] = React.useState([]);
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback((start, limit) => {
    axiosPrivate
      .get(`/api/protected/${currentConfig.dictionaries}`, {
        params: {
          start,
          limit
        }
      })
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("error :>> ", err);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetchData(0, 100);
  }, [fetchData]);

  const updateMyData = (rowIndex, columnId, value) => {
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value
          };
        }
        return row;
      })
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <EnhancedTable
        columns={COLUMNS}
        data={data}
        fetchData={fetchData}
        setData={setData}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        deleteAction={deleteDictionary}
        shouldVisibleToolbar={true}
        populateForm={populateDictionaryForm}
      />
    </div>
  );
};
Dictionary.propTypes = {
  deleteDictionary: PropTypes.func,
  populateDictionaryForm: PropTypes.func,
  handleAddModalOpen: PropTypes.func
};

export default Dictionary;
