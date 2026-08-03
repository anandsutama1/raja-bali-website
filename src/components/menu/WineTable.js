export default function WineTable({ title, items, glassBottle }) {
  return (
    <div className="mb-10">
      <h3 className="font-semibold text-lg mb-3">{title}</h3>
      <table className="w-full text-sm">
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-2">{item.name}</td>
              {glassBottle && <td className="py-2 text-right w-20">{item.glass}</td>}
              <td className="py-2 text-right w-20">{item.bottle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}