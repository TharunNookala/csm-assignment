import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { BsDownload, BsEraser } from 'react-icons/bs'
import { PiSelectionPlus } from 'react-icons/pi'
import { AiOutlineReload } from 'react-icons/ai'
import { ImImages } from 'react-icons/im'
import { FaRegHandPaper } from 'react-icons/fa'
import { MdCleaningServices } from 'react-icons/md'
import { useRef, useState } from 'react'
import '../../index.css'
import maskImage from '../../assets/maskImage.jpg'

const ActualContent = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isObject, setIsObject] = useState(false);
    const [isBackground, setIsBackground] = useState(false);
    const [points, setPoints] = useState([]);
    const [fetchedURL, setFetchedURL] = useState('');
    const [addPointTool, setAddPointTool] = useState(false);
    const [eraserTool, setEraserTool] = useState(false);
    const [generateMask, setGenerateMask] = useState(false);
    const [maskOpacity, setMaskOpacity] = useState(0.7);
    const svgRef = useRef(null);
    const maskImageRef = useRef(null);


    function uploadImage(event) {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(URL.createObjectURL(event.target.files[0]));
            setFetchedURL(URL.createObjectURL(event.target.files[0]))
        }
    }
    function getClickCoordinates(event) {
        event.preventDefault();
        var dim = event.target.getBoundingClientRect();
        var x = event.clientX - dim.left;
        var y = event.clientY - dim.top;
        console.log(x, y)
        return [x, y];
    }
    function addPoint(e) {
        let [x, y] = getClickCoordinates(e);
        console.log("x,y", x, y)
        let newPoint = (
            (isObject || isBackground) ? <circle
                key={points.length + 1}
                cx={x}
                cy={y}
                r="8"
                fill={`${isObject ? 'green' : 'red'}`}
                className='pointer-events-none'
            /> : alert("Please select Add Point Tool and choose either Object or Background")
        );
        let allPoints = [...points, newPoint];
        console.log(allPoints);
        setPoints(allPoints)

    }

    function removePoint() {
        points.length ? setPoints(p => { const temp = [...p]; temp.pop(); return temp; }) : alert("No points to remove. Add some points.")
    }

    function removeImage() {
        setSelectedImage(null);
        setAddPointTool(false);
        setPoints([]);
        setGenerateMask(false);
        setEraserTool(false);
    }
    function handleGenerateMask() {
        points?.length ? setGenerateMask(true) : alert("Add few points to generate mask!")
    }
    const handleMaskImageLoad = () => {
        maskImageRef.current.crossOrigin = 'anonymous';
    };

    async function handleDownload() {
        const svg = svgRef.current;
        // const maskImageURL = { maskImage }
        // const newMaskImage = new Image();
        // newMaskImage.crossOrigin = 'anonymous';
        // newMaskImage.src = maskImageURL;
        const newMaskImage = maskImageRef.current;
        // await maskImage.decode();

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = svg.width.baseVal.value;
        canvas.height = svg.height.baseVal.value;

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.globalAlpha = maskOpacity;
        ctx.drawImage(svg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(newMaskImage, 0, 0, canvas.width, canvas.height);

        const link = document.createElement('a');
        link.download = 'masked_image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

    }

    function calculateDistance(coord1, coord2) {
        const dx = coord1[0] - coord2[0];
        const dy = coord1[1] - coord2[1];
        return Math.sqrt(dx * dx + dy * dy);
    }

    function handleErase(e) {
        let [curX, curY] = getClickCoordinates(e);
        console.log("currX,currY", curX, curY)
        let minDistance = Infinity;
        let nearestIndex = -1;
        let dots = points.map(point => [point.props.cx, point.props.cy]);
        console.log("dots", dots)

        for (let i = 0; i < dots.length; i++) {
            const distance = calculateDistance([curX, curY], dots[i]);
            if (distance < minDistance) {
                minDistance = distance;
                nearestIndex = i;
            }
        }
        console.log("nearest", nearestIndex)
        setPoints(points.splice(0, nearestIndex).concat(points.slice(nearestIndex + 1)))
        console.log("newpoints", points)
    }

    return (
        <section className='w-full h-full py-2 px-2 sm:px-6 space-y-4'>
            <div className='flex items-center justify-between p-2 border'>
                <Link to="" className='hover:bg-gray-100 p-2 rounded-full'><MdOutlineArrowBackIosNew /></Link>
                <div className='flex items-center justify-center gap-2'>
                    <h3 className='hidden sm:inline uppercase font-semibold'>session_code</h3>
                    <span className='text-xs sm:text-sm px-2 py-1 rounded-xl bg-[#C8EAFF]'>
                        {generateMask ? 'STATUS-MASK GENERATED' : (selectedImage ? 'STATUS-ACTIVE' : 'STATUS-NOT_STARTED')}
                    </span>
                </div>
                <button className='flex items-center gap-2 bg-gray-100 hover:bg-gray-50 rounded-md px-3 py-1' onClick={handleDownload}><BsDownload />Download</button>
            </div>
            <div className='h-full sm:h-4/5 p-2 text-gray-500 flex flex-col justify-between sm:flex-row sm:justify-between sm:bg-slate-50'>
                <div className='p-2 sm:h-[30%] grid grid-cols-6 sm:grid-cols-2 gap-2 items-center justify-items border text-2xl'>
                    <button
                        title='Add Point'
                        className={`${selectedImage ? 'hover:bg-gray-50' : 'disabled cursor-not-allowed'} border rounded-md p-2`}
                        onClick={() => { setEraserTool(false); setAddPointTool(!addPointTool) }}>
                        <PiSelectionPlus />
                    </button>
                    <button
                        title='Remove last Point'
                        className={`${selectedImage ? 'hover:bg-gray-50' : 'disabled cursor-not-allowed'} active:bg-gray-200 border rounded-md p-2 transform -scale-x-100`}
                        onClick={removePoint}><AiOutlineReload /></button>
                    <button
                        title='Eraser'
                        className={`${selectedImage ? 'hover:bg-gray-50' : 'disabled cursor-not-allowed'} border rounded-md p-2`}
                        onClick={() => { setAddPointTool(false); setEraserTool(!eraserTool) }}>
                        <BsEraser />
                    </button>
                    <button title='Remove all points'
                        className={`${selectedImage ? 'hover:bg-gray-50' : 'disabled cursor-not-allowed'}  border rounded-md p-2`}
                        onClick={() => { setPoints([]) }}>
                        <MdCleaningServices />
                    </button>
                    <button
                        title='Generate mask'
                        className={`${selectedImage ? 'hover:bg-gray-50' : 'disabled cursor-not-allowed'}  border rounded-md p-2`}
                        onClick={handleGenerateMask}>
                        <ImImages />
                    </button>
                    <button
                        title='Hold and drag'
                        className={`${selectedImage ? 'hover:bg-gray-50' : 'disabled cursor-not-allowed'}  border rounded-md p-2`}>
                        <FaRegHandPaper />
                    </button>
                </div>
                <div className='h-full border-2 md:w-3/5 p-4'>
                    {selectedImage ? (
                        <>
                            <div className='w-full h-full mb-4 flex justify-center items-center overflow-hidden relative' >
                                <svg
                                    className={`min-w-full min-h-full bg-contain bg-no-repeat absolute top-0 
                                    ${addPointTool && (isObject || isBackground) && 'cursor-crosshair'}  ${(eraserTool) && 'cursor-pointer'}`}
                                    style={{ backgroundImage: `url(${fetchedURL})`, backgroundSize: '100% 100%' }}
                                    onClick={eraserTool ? handleErase : addPoint}
                                    ref={svgRef}
                                >
                                    {points}
                                </svg>
                                {generateMask &&
                                    <img
                                        src={maskImage}
                                        alt="Mask"
                                        className='absolute w-full h-full z-50 bg-contain top-0 left-0 flex-none'
                                        style={{ opacity: maskOpacity }}
                                        onLoad={handleMaskImageLoad}
                                        ref={maskImageRef}
                                    />}
                                <br />
                            </div>
                            {selectedImage && <button className='bg-red-500 text-white py-2 px-3 rounded-md mt-4' onClick={removeImage}>Remove</button>}
                        </>
                    )

                        :
                        <div className='flex w-full h-full items-center justify-center bg-gray-50 text-black'>
                            <input
                                type="file"
                                name="myImage"
                                accept="image/*"
                                onChange={uploadImage}
                                className='text-sm text-stone-500 
                            file:mr-5 file:py-1 file:px-3 file:border-[1px]
                            file:text-xs file:font-medium
                            file:bg-gray-200 file:text-stone-700
                            hover:file:cursor-pointer hover:file:bg-gray-50
                            hover:file:text-gray-600'
                            />
                            {points}
                        </div>}
                </div>
                <div className='flex flex-col items-center justify-center sm:justify-normal sm:space-y-4 py-2 sm:py-5 px-2 border'>
                    <div className='flex flex-col justify-center items-center gap-2 p-2'>
                        {
                            addPointTool &&
                            <div className='flex sm:flex-col gap-2 p-2 ml-24 sm:ml-0'>
                                <button
                                    className={`px-4 py-1 text-sm rounded ${(selectedImage && isObject) ? 'bg-green-600 text-white hover:bg-green-400 cursor-pointer' : 'bg-gray-100 text-[#2B2A70] hover:bg-gray-50'}`}
                                    onClick={() => { setIsObject(!isObject) }}
                                >
                                    Object
                                </button>
                                <button
                                    className={`px-4 py-1 text-sm rounded ${(selectedImage && isBackground) ? 'bg-red-400 text-white hover:bg-red-200 hover:text-[#2B2A70]' : 'bg-gray-100 text-[#2B2A70] hover:bg-gray-50'}`}
                                    onClick={() => { setIsBackground(!isBackground) }}
                                >
                                    Background
                                </button>
                            </div>
                        }
                    </div>
                    <div className='w-full sm:h-[15%] p-2 bg-[#EEEEF4] space-y-3 rounded-md'>
                        <label htmlFor='maskopacity' className='text-sm sm:text-base'> Mask Opacity</label>
                        <input
                            className='w-full h-2 bg-red-400 flex items-center gap-4 p-2 hover:bg-gray-100 rounded-md  accent-gray-500 cursor-pointer outline-none disabled:cursor-not-allowed'
                            name="maskopacity"
                            id="maskopacity"
                            type='range'
                            min="0"
                            max="1"
                            step={0.1}
                            value={maskOpacity}
                            onChange={(e) => setMaskOpacity(e.target.value)}
                            disabled={!generateMask}
                        />
                    </div>
                </div>
            </div>
        </section>
    )

}
export default ActualContent