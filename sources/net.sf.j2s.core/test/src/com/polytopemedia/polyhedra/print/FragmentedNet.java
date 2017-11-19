package com.polytopemedia.polyhedra.print;

import java.awt.print.PageFormat;
import java.util.LinkedHashMap;
import java.util.List;

import com.polytopemedia.polyhedra.nets.Edge;
import com.polytopemedia.polyhedra.nets.Face;
import com.polytopemedia.polyhedra.nets.Net;
import com.polytopemedia.polyhedra.nets.split.NetFragment;
import com.polytopemedia.polyhedra.utils.TwoKeyMap;
import com.polytopemedia.polyhedra.vec.LineSegment2D;


class FragmentedNet { 

	private final List<NetFragment> fragments;

	FragmentedNet(Net net, PageFormat pageFormat, double edgeLengthInches) {
		NetFragment wholeNet = new NetFragment(net, pageFormat, edgeLengthInches);
		fragments = wholeNet.shatter();
		generateTabs();
	}
	
	private TwoKeyMap<Face, Edge, TabInfo> tabinfo;
	
	void findLinesAndLabels(LinkedHashMap<LineSegment2D, LineType> lines, List<Label> labels, NetFragment page, boolean lineLabelsIn) {
		page.generateLinesAndLabels(lines, labels, tabinfo, lineLabelsIn);
	}

	private void generateTabs() {
		TabLabelGenerator tabLabels = new TabLabelGenerator();
		tabinfo = new TwoKeyMap<Face, Edge, TabInfo>();
		for (NetFragment fragment : fragments) {
			fragment.generateTabInfo(tabLabels, tabinfo);
		}
	}

	int fragmentCount() {
		return fragments.size();
	}
	
	NetFragment getFragment(int i) {
		return fragments.get(i);
	}


	
	
}
