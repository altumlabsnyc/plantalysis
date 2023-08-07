import { Test, TestRequirement } from "./supabaseAlias"


/**
 * Type to return when using useTests. It includes all the params of the
 * supabase type test and an array of the test requirements of that specific
 * test as the supabase type test_requirement.
 */
export type TestWithLocalRequirements = Test & {
    test_requirements: TestRequirement[]
  }