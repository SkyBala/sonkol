import React, { useCallback } from "react";
import { useInput } from "../../hooks/useInput";
import { RootState, useAppDispatch } from "../../store/store";
import { setSearchValue } from "../../store/slices/blogNewsSlice";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";
import searchIcon from "../../assets/images/common/search.svg";

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const search = useInput("", { minLength: 0 });
  const { searchValue } = useSelector((state: RootState) => state.blogNews);

  const onChangeSearchInput = useCallback(
    debounce((value: string) => {
      dispatch(setSearchValue(value));
    }, 250),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    search.onChange(e);
    onChangeSearchInput(e.target.value);
  };

  return (
    <>
      <div className="mx-auto inp max-w-[1060px] flex justify-between outline-none">
        <input
          className="w-full bg-inherit outline-none"
          type="text"
          placeholder="Search"
          value={search.value}
          onChange={onChangeInput}
        />
        <img className="w-[24px] h-[24px]" src={searchIcon} alt="search" />
      </div>
      {searchValue && (
        <span className="block mt-[16px] text-center">
          Results for the search query{" "}
          <span className="text-blueLight">"{searchValue}"</span>
        </span>
      )}
    </>
  );
};

export default Search;
