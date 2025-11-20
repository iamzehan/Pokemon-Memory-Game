export default function Cards(){
    return (
        <div className="
        grid grid-flow-row grid-cols-2 
        gap-2 lg:gap-0 xl:max-w-[60%] justify-self-center
        lg:grid-cols-4 md:grid-cols-3
        m-3">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
    )
}

function Card(){
    return (
    <div 
    className="
    p-3 rounded-xl bg-amber-300 shadow flex flex-col gap-2 items-center
    lg:scale-95 max-w-[300px]
    active:bg-amber-400 hover:bg-amber-500 hover:md:scale-100 transition-all duration-300 cursor-pointer
    ">
        <img 
        alt="img" 
        className="rounded-lg"
        src="https://www.muraldecal.com/en/img/pkm010-jpg/folder/products-listado-merchanthover/stickers-pikachu-sitting-kawaii-pokemon.jpg"/>
        <p className="text-blue-600 text-2xl">Pickachu</p>
    </div>
    )
}