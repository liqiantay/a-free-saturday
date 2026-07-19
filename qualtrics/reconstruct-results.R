library(jsonlite)

reconstruct_free_saturday <- function(row) {
  chunk_count <- as.integer(row[["FS_ResultChunks"]])
  if (is.na(chunk_count) || chunk_count < 1) return(NULL)

  fields <- sprintf("FS_Result_%02d", seq_len(chunk_count))
  json_text <- paste0(unlist(row[fields], use.names = FALSE), collapse = "")
  fromJSON(json_text, simplifyVector = FALSE)
}

# Example after importing a Qualtrics CSV as `responses`:
# first_session <- reconstruct_free_saturday(responses[1, ])
