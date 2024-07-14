import React from 'react'

const RecipeInfo = ({data}) => {
  return (
    <div className="flex gap-10 items-center justify-center px-4">
          <div className="flex flex-col justify-between">
            <span className="text-white text-center border border-gray-500 py-1.5 px-2 rounded-full mb-2">
              {data?.pricePerServing}{" "}
            </span>

            <span className="text-center text-neutral-100 text-[12px] md:text-md">
              EVALUATION
            </span>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-white text-center border border-gray-500 py-1.5 rounded-full mb-2 p-2">
              {data?.readyInMinutes}
            </span>
            <p className="text-neutral-100 text-[12px] md:text-md">
              TOTAL TIME
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-white text-center border border-gray-500 py-1.5 rounded-full mb-2 p-5">
              {data?.vegetarian ? (
                <span>vegetarian</span>
              ) : (
                <span>non-vegetarian</span>
              )}
            </span>
            <p className="text-center text-neutral-100 text-[12px] md:text-md">
              TYPE
            </p>
          </div>
        </div>
  )
}

export default RecipeInfo