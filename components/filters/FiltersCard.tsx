import Link from 'next/link';
import React from 'react';

interface FilteredItemProps{
  filteredItem: any;
}

const FiltersCard: React.FC<FilteredItemProps> = ({ filteredItem }) => {
  return (
          <>
            <Link href={`/${filteredItem._type}s/${filteredItem.slug.current}`}>
              <div className='bg-white flex flex-col xl:flex-nowrap gap-4 border p-4 h-full min-w-fit'>
              
                <div className='m-auto'>
                  
                  <div className="flex gap-3 items-top text-[#555] text-center text-xl font-bold">
                    {filteredItem.title}
                  </div>

                </div>

              </div>
            </Link>
          </>
        );
    };            

export default FiltersCard;