import React, { useState } from "react";

const UnifexChart = () => {
  const [gsm, setGsm] = useState(110);
  const [sizeInches, setSizeInches] = useState([
    { x: 24, y: 36 },
    { x: 24, y: 40 },
    { x: 28, y: 40 },
    { x: 30, y: 48 },
    { x: 28, y: 102 },
    { x: 30, y: 114 },
    { x: 36, y: 114 },
    { x: 30, y: 60 },
    { x: 24, y: 36 },
  ]);

  const [constants, setConstants] = useState({
    a47: 0.1,
    nonwoven: 510,
    laborElec: 4.2,
    plate28x40: 8600,
    plate31x43: 12800,
    plate35x50: 16000,
    plate40x56: 21000,
    plate43x63: 27800,
    ink: 1406,
    stitching: 5,
  });

  const [quantities, setQuantities] = useState([
    250, 500, 1000, 2000, 3000, 5000, 10000,
  ]);
  const [k47, setK47] = useState(0);
  const [ai4Values, setAi4Values] = useState(
    sizeInches.map((_, index) =>
      index === 4 || index === 5 || index === 6 || index === 8 ? 0.5 : 1
    )
  );

  const handleAi4Change = (index, value) => {
    const newAi4Values = [...ai4Values];
    newAi4Values[index] = parseFloat(value);
    setAi4Values(newAi4Values);
  };

  const handleConstantChange = (key, value) => {
    setConstants({
      ...constants,
      [key]: parseFloat(value),
    });
  };

  const handleSizeChange = (index, dimension, value) => {
    const newSizeInches = [...sizeInches];
    newSizeInches[index] = {
      ...newSizeInches[index],
      [dimension]: parseFloat(value),
    };
    setSizeInches(newSizeInches);
  };

  const calculateRow = (x, y, index) => {
    const footx = x / 12;
    const footy = y / 12;

    let P4;

    if (index === 0) {
      P4 = constants.a47 - 0.02;
    } else if (index === 1 || index === 2) {
      P4 = constants.a47;
    } else if (index >= 3 && index <= 6) {
      P4 = constants.a47 + 0.05;
    } else if (index === 7) {
      P4 = constants.a47 + 0.25;
    } else if (index === 8) {
      P4 = constants.a47 + 0.3;
    }

    const AG4 =
      index === 4 || index === 5 || index === 6 || index === 8
        ? constants.laborElec * 2
        : constants.laborElec;

    const AI4 = ai4Values[index];
    const AF4 = constants.stitching;
    const AE4 = constants.ink * 0.0000032 * x * y;
    const AH4 = AG4 + AF4 + AE4;
    const AD4 = 6000 / AI4;
    const AC4 = 3500 / AI4;
    const AB4 = constants.plate28x40 / AI4;
    const m48 = constants.nonwoven + 5;
    const Q4 =
      (gsm / 1000 / 1550) * m48 + ((gsm / 1000 / 1550) * m48 * 3) / 100;
    const R4 = Q4 * x * y;
    const AA4 = (R4 + AH4) * P4;
    const S4 = R4 + AA4 + AH4;
    const T4 = S4 * 250 + AB4 + AD4;
    const U4 = S4 * 500 + AB4 + AD4;
    const V4 = S4 * 1000 + AB4;

    const H4 = T4 / 250;
    const I4 = U4 / 500 - 5;
    const J4 = V4 / 1000;

    const calculateForQuantity = (quantity) => {
      const T4 = S4 * quantity + AB4 + AD4;
      return {
        total: T4,
        perUnit: T4 / quantity + k47,
      };
    };

    const values = quantities.map((q) => calculateForQuantity(q));

    return {
      sizeFoot: { x: footx, y: footy },
      sizeInches: { x, y },
      stitching: "Uniflex per piece",
      values: values.map((v) => v.perUnit),
      pPercent: P4 * 100,
      totalCost: S4,
      processValues: values.map((v) => v.total),
      T4,
      U4,
      S4,
      Q4,
      R4,
      P4,
      AA4,
      AB4,
      AC4,
      AD4,
      AE4,
      AF4,
      AG4,
      AH4,
      AI4,
      H4,
      I4,
      J4,
    };
  };

  const rows = sizeInches.map((size, index) =>
    calculateRow(size.x, size.y, index)
  );
  const handleGsmChange = (newGsm) => {
    setGsm(newGsm);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Uniflex Chart ({gsm} GSM)</h1>
      <div className="text-white mt-4">
        {[110, 100, 90, 80].map((gsmValue) => (
          <button
            key={gsmValue}
            className={`ml-5 p-4 border rounded ${
              gsm === gsmValue ? "bg-blue-700" : "bg-blue-500"
            }`}
            onClick={() => handleGsmChange(gsmValue)}
          >
            {gsmValue} GSM
          </button>
        ))}
      </div>

      <table className="w-[180%] border-collapse border mt-4 border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Size Foot</th>
            <th className="border border-gray-300 p-2">Size Inches</th>
            <th className="border border-gray-300">Stitching</th>
            {quantities.map((q) => (
              <th key={q} className="border border-gray-300 p-2">
                {q}
              </th>
            ))}
            <th className="p-2 bg-white"></th>

            <th className="border border-gray-300 p-2">P%</th>
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2"></th>

            <th className="border border-gray-300 p-2">Total Cost</th>
            {quantities.map((q) => (
              <th key={`process-${q}`} className="border border-gray-300 p-2">
                {q}
              </th>
            ))}
            <th className="border border-gray-300 p-2">Pro</th>
            <th className="border border-gray-300 p-2">Process</th>
            <th className="border border-gray-300 p-2" colSpan={2}>
              Over Heads
            </th>
            <th className="border border-gray-300 p-2">Ink</th>
            <th className="border border-gray-300 p-2">Stitch</th>
            <th className="border border-gray-300 p-2">L/E</th>
            <th className="border border-gray-300 p-2">O Heads</th>
            <th className="border border-gray-300 p-2">ups</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{`${row.sizeFoot.x.toFixed(
                2
              )} x ${row.sizeFoot.y.toFixed(2)}`}</td>
              <td className="border border-gray-300 p-2">{`${row.sizeInches.x} x ${row.sizeInches.y}`}</td>
              <td className="border border-gray-300 p-2">{row.stitching}</td>
              {row.values.map((value, i) => (
                <td key={i} className="border border-gray-300 p-2">
                  {i === 1
                    ? row.I4.toFixed(2)
                    : i === 2
                    ? row.J4.toFixed(2)
                    : value.toFixed(2)}
                </td>
              ))}
              <td className="p-4"></td>

              <td className="border border-gray-300 p-2">
                {row.pPercent.toFixed(2)}%
              </td>
              <td className="border border-gray-300 p-2">
                {row.Q4.toFixed(3)}
              </td>
              <td className="border border-gray-300 p-2">
                {row.R4.toFixed(2)}
              </td>

              <td className="border border-gray-300 p-2">
                {row.totalCost.toFixed(2)}
              </td>
              {row.processValues.map((value, i) => (
                <td key={i} className="border border-gray-300 p-2">
                  {i === 0
                    ? row.T4.toFixed(2)
                    : i === 1
                    ? row.U4.toFixed(2)
                    : (value - 6000).toFixed(2)}
                </td>
              ))}
              <td className="border border-gray-300 p-2">
                {row.AA4.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-2">
                {row.AB4.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-2">
                {row.AC4.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-2">
                {row.AD4.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-2">
                {row.AE4.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-2">
                {row.AF4.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-2">
                {row.AG4.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-2">
                {row.AH4.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="number"
                  value={ai4Values[index]}
                  step={0.1}
                  onChange={(e) => handleAi4Change(index, e.target.value)}
                  className="w-[40px] outline-none"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8">
        <h2 className="text-xl font-bold">Edit Sizes (inches)</h2>
        {sizeInches.map((size, index) => (
          <div key={index} className="mb-4">
            <span>Size {index + 1}: </span>
            <input
              type="number"
              value={size.x}
              onChange={(e) => handleSizeChange(index, "x", e.target.value)}
              className="border p-1 mx-2"
            />
            x
            <input
              type="number"
              value={size.y}
              onChange={(e) => handleSizeChange(index, "y", e.target.value)}
              className="border p-1 mx-2"
            />
          </div>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold">Edit Constants</h2>
        <p className="mb-1">Percentage Value: <b>{constants.a47 * 100}</b></p>
        {Object.entries(constants).map(([key, value]) => (
          <div key={key} className="mb-4">
            <label className="mr-2">{key != "a47" ? key.toUpperCase() : ""} </label>
            <input
              type="number"
              step={key === "a47" ? 0.01 : 1}
              value={value.toFixed(1)}
              onChange={(e) => handleConstantChange(key, e.target.value)}
              className="border p-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnifexChart;
