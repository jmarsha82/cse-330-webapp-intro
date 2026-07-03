import contextlib
import io
import pathlib
import sys
import tempfile
import unittest


ROOT = pathlib.Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "Module4"))

import players


class PlayersParserTests(unittest.TestCase):
    def write_stats_file(self, content):
        handle = tempfile.NamedTemporaryFile("w", delete=False, encoding="utf-8")
        with handle:
            handle.write(content)
        return handle.name

    def test_read_file_aggregates_valid_player_lines(self):
        path = self.write_stats_file(
            "Jane Smith batted 4 times with 2 hits and 1 runs\n"
            "Invalid line that should be ignored\n"
            "Jane Smith batted 2 times with 1 hits and 0 runs\n"
            "Alex Johnson batted 5 times with 4 hits and 2 runs\n"
        )

        result = dict(players.readFile(path))

        self.assertAlmostEqual(result["Jane Smith"], 0.5)
        self.assertAlmostEqual(result["Alex Johnson"], 0.8)
        self.assertEqual(len(result), 2)

    def test_print_list_sorts_descending_and_formats_three_decimals(self):
        output = io.StringIO()

        with contextlib.redirect_stdout(output):
            players.printList([("Jane Smith", 0.5), ("Alex Johnson", 0.8)])

        self.assertEqual(output.getvalue(), "Alex Johnson: 0.800\nJane Smith: 0.500\n")


if __name__ == "__main__":
    unittest.main()
