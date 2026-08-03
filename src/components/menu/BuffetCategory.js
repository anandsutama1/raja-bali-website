export default function BuffetCategory({ title, instruction, options }) {
  return (
    <div className="mb-10">
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      {instruction && <p className="text-sm text-raja-red mb-3">{instruction}</p>}
      <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
        {options.map((opt, i) => (
          <li key={i}>{opt}</li>
        ))}
      </ol>
    </div>
  );
}