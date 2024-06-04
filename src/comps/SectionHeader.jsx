function SectionHeader({title, desc}) {
  return (  
    <div className="max-w-lg mx-auto mb-8 text-center">
      <h2 className="text-3xl md:text-4xl">
        <span className="border-t-4 border-orange-600">{title}</span>
      </h2>
      {desc && <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">{desc}</p> }
    </div>
  );
}

export default SectionHeader;