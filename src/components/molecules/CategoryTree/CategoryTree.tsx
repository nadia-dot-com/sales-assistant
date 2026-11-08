"use client";

import { Box, createTreeCollection, TreeView } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { NextLink } from "@/components/atoms/NextLink";
import { styles } from "@/components/molecules/CategoryTree/CategoryTree.styles";
import type { Category } from "@/lib/category/category.types";
import { findCategoryPath } from "@/lib/category/findCategory";
import { searchHref } from "@/lib/category/searchHref";

interface CategoryTreeProps {
  category: Category;
  currentCategoryId?: string;
}

const TAG = "CategoryTree";

export function CategoryTree({
  category,
  currentCategoryId,
}: CategoryTreeProps) {
  const collection = useMemo(
    () =>
      createTreeCollection<Category>({
        rootNode: category,
        nodeToValue: (node) => node.id,
        nodeToString: (node) => node.title,
      }),
    [category],
  );

  const currentCategoryPath = useMemo(
    () =>
      currentCategoryId
        ? findCategoryPath(category, currentCategoryId).map((node) => node.id)
        : [],
    [category, currentCategoryId],
  );

  const [expandedValue, setExpandedValue] =
    useState<string[]>(currentCategoryPath);

  useEffect(() => {
    setExpandedValue(currentCategoryPath);
  }, [currentCategoryPath]);

  const handleExpandedChange = ({
    expandedValue: nextExpanded,
  }: TreeView.ExpandedChangeDetails<Category>) => {
    const opened = nextExpanded.find((id) => !expandedValue.includes(id));

    if (!opened) {
      setExpandedValue(nextExpanded);
      return;
    }

    setExpandedValue(findCategoryPath(category, opened).map((node) => node.id));
  };

  return (
    <Box as="aside" {...styles.aside} data-testid={TAG}>
      <TreeView.Root
        collection={collection}
        expandedValue={expandedValue}
        onExpandedChange={handleExpandedChange}
        size="md"
        animateContent
      >
        <TreeView.Label as="h2" {...styles.label}>
          {category.title}
        </TreeView.Label>
        <TreeView.Tree>
          <TreeView.Node
            render={({ node, nodeState }) =>
              nodeState.isBranch ? (
                <TreeView.BranchControl>
                  <TreeView.BranchText>
                    <NextLink
                      href={searchHref(null, category.key, node.id, 1)}
                      aria-current={
                        currentCategoryId === node.id ? "page" : undefined
                      }
                      marginLeft={nodeState.depth * 2}
                      {...styles.branchControl}
                    >
                      {node.title}
                    </NextLink>
                  </TreeView.BranchText>
                  <TreeView.BranchIndicator>
                    <ChevronRight />
                  </TreeView.BranchIndicator>
                </TreeView.BranchControl>
              ) : (
                <TreeView.Item asChild>
                  <NextLink
                    href={searchHref(null, category.key, node.id, 1)}
                    aria-current={
                      currentCategoryId === node.id ? "page" : undefined
                    }
                    marginLeft={nodeState.depth * 2}
                    {...styles.marginForItem}
                  >
                    <TreeView.ItemText>{node.title}</TreeView.ItemText>
                  </NextLink>
                </TreeView.Item>
              )
            }
          />
        </TreeView.Tree>
      </TreeView.Root>
    </Box>
  );
}
