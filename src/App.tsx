import { useEffect, useState } from 'react';
import Table from './components/Table';
import { TableName, TableType } from './utils/constants';
import { alcoholClasses } from './utils/helper';
import "./App.css";
import Heading from './components/Heading';

function App() {
  const [wineClasses, setWineClasses] = useState<number[]>([]);

  useEffect(() => {
    const res = alcoholClasses();
    res.unshift(-99);
    setWineClasses(res);
  }, []);

  return (
    <div className="container">
      <Heading tableName={TableName.FLAVANOID_TABLE} />
      <Table wineClasses={wineClasses} tableType={TableType.FLAVANOID} />

      <Heading tableName={TableName.GAMMA_TABLE} />
      <Table wineClasses={wineClasses} tableType={TableType.GAMMA} />
    </div>
  );
}

export default App;
